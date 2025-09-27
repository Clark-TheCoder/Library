export async function getBestSellers() {
  try {
    let response = await fetch("/getBestSellers", {
      method: "GET",
    });

    let data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return [
        {
          title: "Oh No!",
          author: "Cannot get books",
          rank: "?",
          book_image: "/media/dashboard/404_book.png",
        },
      ];
    }
  } catch (error) {
    return [
      {
        title: "Oh No!",
        author: "Cannot get books",
        rank: "?",
        book_image: "/media/dashboard/404_book.png",
      },
    ];
  }
}
