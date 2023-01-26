import * as my_dongle from 'bleuio'
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_connect().then(()=>{
    my_dongle.at_central().then(()=>{
      repeatfunc()
       setInterval(()=>{
        repeatfunc()
      },15000)
    })

  })
})
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.ati().then((data)=>console.log(data))

})
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_central()
})
document.getElementById('connect').addEventListener('click', function(){

  my_dongle.stop(()=>{
    my_dongle.at_gapscan(2).then((x)=> {
      console.log(x)
    var unique = [];
    var uniqDev = [];
    x.map((val)=>{
      if(val[0]==='['){ //to show only devices with starts the name with '['
      if(unique.indexOf(val.slice(0, 4)) === -1) { //to remove duplicates
        unique.push(val.slice(0, 4));
        uniqDev.push(val);
        document.getElementById('print').innerHTML +=val+'</br>' // to print the devices on the sreen
      }
    }
    })



    })
  })

})
function swap16(val) { //to swap the string
  return ((val & 0xFF) << 8)
         | ((val >> 8) & 0xFF);
}

const advDataDecode =((data)=>{
  let pos = data.indexOf("5B0705")
  let dt = new Date();
  let currentTs = dt.getFullYear()
  + '/'
  + (dt.getMonth() + 1).toString().padStart(2, "0")
  + '/'
  + dt.getDate().toString().padStart(2, "0")
  +' '
  +
  dt.getHours().toString().padStart(2, "0")
  +
  ':'
  +
  dt.getMinutes().toString().padStart(2, "0")
  +
  ':'
  +dt.getSeconds().toString().padStart(2, "0")
  let tempHex=parseInt('0x'+data.substr(pos+22,4).match(/../g).reverse().join('')) //temperature cal
  if(tempHex>1000)
      tempHex = (tempHex - (65535 + 1) )/10
  else
      tempHex = tempHex/10
  return {
    "boardID":data.substr(pos+8,6),
    "type":data.substr(pos+6,2),
    "noise":parseInt('0x'+data.substr(pos+14,4).match(/../g).reverse().join('')),
    "pressure":parseInt('0x'+data.substr(pos+18,4).match(/../g).reverse().join(''))/10,
    "temp":tempHex,
    "hum":parseInt('0x'+data.substr(pos+26,4).match(/../g).reverse().join(''))/10,
    "voc":parseInt('0x'+data.substr(pos+30,4).match(/../g).reverse().join(''))/10,
    "pm1":parseInt('0x'+data.substr(pos+34,4).match(/../g).reverse().join(''))/10,
    "pm25":parseInt('0x'+data.substr(pos+38,4).match(/../g).reverse().join(''))/10,
    "pm10":parseInt('0x'+data.substr(pos+42,4).match(/../g).reverse().join(''))/10,
    "co2":parseInt('0x'+data.substr(pos+46,4)),
    "ts":currentTs

  }
})

const repeatfunc=()=>{
  my_dongle.at_findscandata('5B07050960FDED',6).then((x)=> { //find the string
    let lastArr= x[x.length-1]
      let adv= lastArr.split(' ').pop()
      if(adv.length>25){
        let airQ=advDataDecode(adv)



        let thenoise=airQ.noise

        console.log(thenoise);

        if(thenoise<=1000){
          console.log(thenoise + '  ' + 'Excellent')
          // document.getElementById('co2Value').innerHTML = thenoise
          document.getElementById('coloredBox').innerHTML ='Excellent' +'   '

          document.getElementById("coloredBox").classList.add('greenBtn');
        }else if(thenoise<=2000){
          console.log(thenoise + '  ' + 'Good')
          
          document.getElementById('coloredBox').innerHTML ='Good' +'  '


          document.getElementById("coloredBox").classList.add('yellowBtn');
        }else {
          console.log(thenoise + '  ' + 'Poor')
          
          document.getElementById('coloredBox').innerHTML ='Poor' +'  '



          document.getElementById("coloredBox").classList.add('redBtn');

        }
      }

  })
}

document.getElementById('connect').addEventListener('click', function(){


})











