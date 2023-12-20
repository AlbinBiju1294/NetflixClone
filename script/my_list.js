const cardPaths=["https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/08/Locke-and-Key-Cover.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
"https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcsNRTCR_xEGk0JKJnrf-zVc7eZYzLh3sojYa1Rude8R_3jboyMRsOysg_b5r0zg69rO15TU_T7aI0lKTy-XVda4em0FsaNpkTcL.jpg?r=15c",
 "https://wallpapercosmos.com/w/full/e/a/7/247849-3840x2160-desktop-4k-money-heist-wallpaper.jpg",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOH3p739bKEWF_ER4UGjnwPBRvG-W7WgPUHyPlnVtclOkHiVl0vlj3SCGS1PkiuwStkg&usqp=CAU",
 "assets/logo.png"
]






function createCard(cardNo,imgPath) {
    const cardContainer = document.getElementById('test');
 
    const cardHtml = `
      <div class="card">
        <div class="card-body">
          <img src="${imgPath}" class="card-img-top" alt="Image for Card ${cardNo}" id="cardimg">
         </div>
      </div>
    `;
 
    // Append the card HTML to the container to the first row
    cardContainer.innerHTML += cardHtml;
  }
  for(let count=1;count<=4;count++)
  {
     createCard(count,cardPaths[4]);
  }