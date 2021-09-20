const snapshotParser = (snapshot) => {
  if (snapshot === null) return []
  const data = snapshot.docs.map(doc => {
    const docData = doc.data()
    docData._id = doc.id
    docData._ref = doc.ref
    return docData
  })

  return data
}

export default snapshotParser