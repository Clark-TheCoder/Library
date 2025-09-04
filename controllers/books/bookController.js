export async function addBook(req, res) {
  const { title, author, genre, rating, thoughts } = req.body;
  if (!title || !author) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }

  try {
    //const result = await createNewBook();
    // if (result) {
    //   return res.status(400).json({ message: "Entry saved to your library" });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ message: "Could not save your entry at this time" });
    // }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
