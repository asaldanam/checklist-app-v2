/** Genera las tags para la búsqueda en función del texto pasado */
export function generateTags(text: string): string[] {
  const blacklist = ['con', 'de', 'del', 'el']
  let tags = [];
  let accumulator = '';

  text.split(' ')
    .filter(word => !blacklist.includes(word))
    .forEach(word => {
      word.split('').forEach((letter, index) => {
        const newTag = accumulator + letter
        if ((index + 1) >= 3) {
          tags = [...tags, newTag]
        }
        accumulator = newTag
      })
      accumulator = ''
    })
  
  return tags;
}