let nextNoteId = 0

export const addNote = text => ({
  type: 'ADD_NOTE',
  id: nextNoteId++,
  text
})

export const removeNote = id => ({
  type: 'REMOVE_NOTE',
  id
})
