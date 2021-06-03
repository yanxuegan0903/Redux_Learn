
export default function(){
  // let letters = ['00','11','22','33','44','55','66','77','88','99','aa','bb','cc','dd','ee','ff']
  let letters = ['00','44','88','bb','ff']

  let colors = []
  let firstLetter = '#'
  for (let i = 0;i<letters.length;i++){
    let r=letters[i]
    for (let j = 0;j<letters.length;j++){
      let g=letters[j]
      for (let k = 0;k<letters.length;k++){
        let b=letters[k]
        let rgb = firstLetter+r+g+b
        colors.push(rgb)
      }
    }
  }
  return colors
}
