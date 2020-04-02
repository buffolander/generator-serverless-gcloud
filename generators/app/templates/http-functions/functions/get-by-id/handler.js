module.exports = async (req, res) => {
  const { param: { id } } = req
  
  return res.json({ ok: true, id })
}
