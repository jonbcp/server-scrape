const express = require('express')
const app = express()
const port = 3000
const getData = require('./func/getData')
const cors = require('cors')
app.use(cors())

app.get('/hongkong', (req, res) => {
  let hasil = getData.getHongkong()
  res.send(hasil)
})

app.get('/sydney', (req, res) => {
  let hasil = getData.getSydney()
  res.send(hasil)
})

app.get('/sgp', (req, res) => {
  let hasil = getData.getSGP()
  res.send(hasil)
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})


// looping
setInterval(()=>{
  getData.HongkongUpdate();
  getData.SydneyUpdate();
  getData.SGPUpdate();
}, 7000)
