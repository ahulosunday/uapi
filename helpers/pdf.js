const fs = require('fs')
const pdfParse = require('pdf-parse')

const getPDF = async (file) => {
  let readFileSync = fs.readFileSync(file)
  try {
    let pdfExtract = await pdfParse(readFileSync)
    var obj = []
    var obj1 =[]
    var obj2 =[]
    obj = (JSON.stringify(pdfExtract.text).split("\\n"))
    for (var i = 1; i < obj.length; i ++){
        if(obj[i] === '') continue
     obj1.push(obj[i].split(' '))
    }
    for (var i = 1; i < obj1.length; i ++){
        if(isNaN(parseInt(obj1[i][0]))) continue
        obj2.push(obj1[i])
    }
    //console.log(pdfExtract.text)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getPDF
    }
