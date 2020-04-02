'use strict'

const path = require('path')
const yosay = require('yosay')

const Generator = require('yeoman-generator')

const normalizeAnswer = (arg) => (arg.split(' ').join('-').toLowerCase())

module.exports = class extends Generator {
  async prompting() {
    this.log(yosay('Hi There! Let\'s get your GCP Serverless project setup, shall we?'))
    this.basics =  await this.prompt([
      {
        name: 'authorName',
        message: 'Author (name)',
        type: 'input',
        default: 'none',
        store: true,
      },
      {
        name: 'authorEmail',
        message: 'Author (email)',
        type: 'input',
        default: 'none',
        store: true,
      },
      {
        name: 'serviceName',
        message: 'Service name',
        type: 'input',
        default: this.appname,
      },
      {
        name: 'serviceType',
        message: 'Service type',
        type: 'list',
        choices: [
          'API Endpoint(s) (HTTP Trigger)',
          'Background Functions (Cloud Pub/Sub Triggers, Cloud Storage Triggers)',
        ],
        default: 'API Endpoint(s) (HTTP Triggers)'
      },
      {
        name: 'projectRuntime',
        message: 'Project runtime',
        type: 'list',
        choices: [
          /* nodejs8 */ 'Node.js 8',
          /* nodejs10 */ 'Node.js 10 (Beta)',
          /* python37 'Python 3.7.6', */
          /* go113 'Go 1.13', */
        ],
        default: 'Node.js 10 (Beta)',
      },
      {
        name: 'projectRegion',
        message: 'Project region',
        type: 'list',
        choices: [
          'asia-east1',
          'asia-east2',
          'asia-northeast1',
          'asia-northeast2',
          'asia-northeast3',
          'asia-south1',
          'asia-southeast1',
          'australia-southeast1',
          'europe-north1',
          'europe-west1',
          'europe-west2',
          'europe-west3',
          'europe-west4',
          'europe-west6',
          'northamerica-northeast1',
          'southamerica-east1',
          'us-central1',
          'us-east1',
          'us-east4',
          'us-west1',
          'us-west2',
          'us-west3'
        ],
        'default': 'us-central1',
      },
      {
        name: 'envProdProject',
        message: 'Your GCP project_id (production)',
        type: 'input',
        default: 'none',
      },
      {
        name: 'envProdTag',
        message: 'Tag for your Serverless PROD environment',
        type: 'input',
        default: 'live',
        store: true,
      },
      {
        type: 'confirm',
        name: 'envDevExists',
        message: 'Should your service include a DEV environment?',
      },
    ])

    this.envDev = null
    if (this.basics.envDevExists) this.envDev =  await this.prompt([
      {
        name: 'envDevProject',
        message: 'Your GCP project_id (development)',
        type: 'input',
        default: 'none',
      },
      {
        name: 'envDevTag',
        message: 'Tag for your Serverless DEV environment',
        type: 'input',
        default: 'dev',
        store: true,
      },
    ])

    this.log('')
    this.extras =  await this.prompt([
      {
        name: 'primaryDatabase',
        message: 'Your primary database',
        type: 'list',
        choices: [
          'Firestore',
          'MongoDB Atlas',
        ],
        store: true,
      },
      {
        name: 'addPackages',
        message: 'Install additional packages',
        type: 'checkbox',
        choices: [
          '@brdu/authorizer',
          '@google-cloud/bigquery',
          'axios',
          // 'Google Memorystore for Redis',
          'moment',
          'moment-timezone',
        ],
      },
    ])
    this.log('')

    const kBasics = ['serviceName', 'serviceType', 'projectRuntime', 'envProdTag', 'envProdProject']
    const kEnvDev = ['envDevTag', 'envDevProject']
    const nBasics = {}
    kBasics.map((key, idx) => { 
      try { nBasics[key] = normalizeAnswer(this.basics[key]) } catch (err) {}
      try { nBasics[kEnvDev[idx]] = normalizeAnswer(this.envDev[kEnvDev[idx]]) } catch (err) {}
    })
    this.nBasics = nBasics
  }
  
  copySharedFiles() {
    const { serviceName, envProdTag, envDevTag } = this.nBasics
    const { authorName, authorEmail, envDevExists } = this.basics

    this.fs.copyTpl(this.templatePath('shared'), this.destinationPath(''), {
      authorName, authorEmail, serviceName, envProdTag,
    })

    const hiddenFiles = ['.eslintrc.yml', '.gitignore', '.nvmrc']
    hiddenFiles.map(filename => {
      this.fs.copyTpl(this.templatePath(`shared/${filename}`), this.destinationPath(filename))
    })
    this.fs.copyTpl(
      this.templatePath('shared/.env.live'),
      this.destinationPath(`.env.${envProdTag}`), { envProdTag }
    )
    if (envDevExists) this.fs.copyTpl(
      this.templatePath('shared/.env.dev'),
      this.destinationPath(`.env.${envDevTag}`), { envDevTag }
    )
  }

  copySpecificFiles() {
    const { envDevExists, projectRegion } = this.basics
    const nBasics = this.nBasics

    if (nBasics.serviceType.indexOf('background-functions') === 0) {
      this.fs.copyTpl(this.templatePath('background-functions'), this.destinationPath(''), {
        serviceName: nBasics.serviceName,
        defaultEnvironment: envDevExists ? nBasics.envDevTag : nBasics.envProdTag,
        envDevTag: envDevExists ? nBasics.envDevTag : 'dev',
        envDevProject: envDevExists ? nBasics.envDevProject : 'none',
        envProdTag: nBasics.envProdTag,
        envProdProject: nBasics.envProdProject,
        projectRegion,
        projectRuntime: nBasics.projectRuntime.indexOf('node.js-8') === 0 ? 'nodejs8' : 'nodejs10',
      })
    }
    if (nBasics.serviceType.indexOf('api-endpoint(s)') === 0) {
      this.fs.copyTpl(this.templatePath('http-functions'), this.destinationPath(''), {
        serviceName: nBasics.serviceName,
        defaultEnvironment: envDevExists ? nBasics.envDevTag : nBasics.envProdTag,
        envDevTag: envDevExists ? nBasics.envDevTag : 'dev',
        envDevProject: envDevExists ? nBasics.envDevProject : 'none',
        envProdTag: nBasics.envProdTag,
        envProdProject: nBasics.envProdProject,
        projectRegion,
        projectRuntime: nBasics.projectRuntime.indexOf('node.js-8') === 0 ? 'nodejs8' : 'nodejs10',
        useAuthorizer: this.extras.addPackages.includes('@brdu/authorizer') ? '' : '// ',
      })
    }
  }

  installDependencies() {
    this.npmInstall()

    const dependencies = ['dotenv','lodash','winston']
    if (normalizeAnswer(this.basics.serviceType).indexOf('api-endpoint') === 0) {
      dependencies.push('express','cors','compression','body-parser','cookie-parser')
    } else {
      dependencies.push('@google-cloud/pubsub','@google-cloud/storage')
    }
    this.extras.addPackages.forEach(_package => {
      dependencies.push(_package)
      if (_package === '@brdu/authorizer') dependencies.push('jsonwebtoken')
    })
    const primaryDatabase = normalizeAnswer(this.extras.primaryDatabase)
    if (primaryDatabase.indexOf('firestore') === 0) dependencies.push('firebase-admin')
    if (primaryDatabase.indexOf('mongodb') === 0) dependencies.push('mongoose')
    
    this.npmInstall(dependencies, { 'save': true })
  }

  // add clients
}
