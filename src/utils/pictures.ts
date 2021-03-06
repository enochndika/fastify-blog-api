/* Array of pictures which will allows to generate blog post picture*/
const pictures: Array<string> = [
  'https://media.istockphoto.com/photos/writing-a-blog-blogger-influencer-reading-text-on-screen-picture-id1198931639?b=1&k=6&m=1198931639&s=170667a&w=0&h=gHik9zgP0aQZdS4xSHtHVZow7IihPXU64iPAH1LoInk=',
  'https://media.istockphoto.com/photos/business-video-conference-picture-id1214822053?b=1&k=6&m=1214822053&s=170667a&w=0&h=OOvmgk8mAADNEKl0o29HswPvTmos69XlGUxp31LBu_g=',
  'https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049__340.jpg',
  'https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851__340.jpg',
  'https://cdn.pixabay.com/photo/2015/07/27/20/27/mockup-863469__340.jpg',
  'https://cdn.pixabay.com/photo/2016/09/04/18/51/food-1644858__340.jpg',
  'https://cdn.pixabay.com/photo/2016/11/01/18/43/instagram-1789189__340.jpg',
  'https://cdn.pixabay.com/photo/2018/04/13/16/43/notepad-3316997__340.jpg',
  'https://media.istockphoto.com/photos/woman-using-laptop-on-a-bench-picture-id1156710615?b=1&k=6&m=1156710615&s=170667a&w=0&h=CGPUm0O82xg_cRBrubpu41tbHRca_lHgDhaxhaYP_2Q=',
  'https://cdn.pixabay.com/photo/2015/06/01/09/05/twitter-793050__340.jpg',
  'https://cdn.pixabay.com/photo/2017/04/03/20/35/paper-2199502__340.jpg',
  'https://cdn.pixabay.com/photo/2015/01/05/11/02/wordpress-589121__340.jpg',
  'https://cdn.pixabay.com/photo/2018/01/09/22/51/cup-3072700__340.jpg',
  'https://cdn.pixabay.com/photo/2019/03/13/21/16/flatlay-4053769__340.jpg',
  'https://cdn.pixabay.com/photo/2015/07/15/11/53/woodtype-846088__340.jpg',
  'https://cdn.pixabay.com/photo/2016/09/28/18/20/smartphone-1701096__340.jpg',
  'https://cdn.pixabay.com/photo/2019/06/09/06/50/table-4261549__340.jpg',
  'https://cdn.pixabay.com/photo/2018/02/11/22/22/paper-3146953__340.jpg',
  'https://cdn.pixabay.com/photo/2018/04/15/14/56/writing-3321866__340.jpg',
  'https://cdn.pixabay.com/photo/2019/05/17/19/46/notepad-4210517__340.jpg',
  'https://cdn.pixabay.com/photo/2018/04/13/11/17/notepad-3316266__340.jpg',
  'https://cdn.pixabay.com/photo/2017/08/17/13/33/classified-2651347__340.jpg',
  'https://cdn.pixabay.com/photo/2019/07/09/06/27/table-4326307__340.jpg',
  'https://cdn.pixabay.com/photo/2018/03/26/06/20/desktop-3261770__340.jpg',
  'https://cdn.pixabay.com/photo/2015/07/16/12/29/mockup-847643__340.jpg',
  'https://cdn.pixabay.com/photo/2018/04/07/08/28/coffee-3297996__340.jpg',
  'https://cdn.pixabay.com/photo/2019/03/31/07/44/office-4092613__340.jpg',
  'https://cdn.pixabay.com/photo/2020/05/30/10/01/update-5238354__340.jpg',
  'https://cdn.pixabay.com/photo/2019/06/30/21/36/newsletter-4308826__340.jpg',
  'https://cdn.pixabay.com/photo/2018/03/08/21/11/writing-3209899__340.jpg',
  'https://cdn.pixabay.com/photo/2018/11/13/18/03/blog-3813603__340.jpg',
  'https://cdn.pixabay.com/photo/2019/05/27/23/00/flatlay-4233914__340.jpg',
  'https://cdn.pixabay.com/photo/2019/05/20/14/53/notepad-4216830__340.jpg',
  'https://cdn.pixabay.com/photo/2018/08/15/08/48/social-3607508__340.jpg',
  'https://cdn.pixabay.com/photo/2018/09/05/20/31/diary-3657055__340.jpg',
  'https://cdn.pixabay.com/photo/2017/06/16/23/37/vegetables-2410708__340.jpg',
  'https://cdn.pixabay.com/photo/2018/11/03/21/04/old-3792834__340.jpg',
  'https://cdn.pixabay.com/photo/2020/05/25/17/05/mockup-5219513__340.jpg',
  'https://cdn.pixabay.com/photo/2020/05/19/12/04/work-5190435__340.jpg',
  'https://media.istockphoto.com/photos/home-office-picture-id1203373201?b=1&k=6&m=1203373201&s=170667a&w=0&h=jUIYZXGhgGVl_1nPrAqjNddhK_ODI0kzEWyC4EQmZAI=',
  'https://cdn.pixabay.com/photo/2017/07/12/19/33/waterfall-2498072__340.jpg',
  'https://cdn.pixabay.com/photo/2017/08/09/00/50/cherry-tomatoes-2613157__340.jpg',
  'https://cdn.pixabay.com/photo/2020/05/25/17/05/mockup-5219512__340.jpg',
  'https://cdn.pixabay.com/photo/2019/02/03/20/43/coffee-3973458__340.jpg',
  'https://cdn.pixabay.com/photo/2018/12/22/15/48/cup-3889868__340.jpg',
  'https://cdn.pixabay.com/photo/2019/10/29/18/21/working-4587754__340.jpg',
  'https://cdn.pixabay.com/photo/2020/05/21/11/30/blog-5200344__340.jpg',
  'https://cdn.pixabay.com/photo/2019/06/15/09/24/apple-4275104__340.jpg',
  'https://cdn.pixabay.com/photo/2020/04/09/14/12/home-5021653__340.jpg',
  'https://cdn.pixabay.com/photo/2018/09/22/12/00/computer-3695160__340.jpg',
  'https://cdn.pixabay.com/photo/2020/02/20/19/47/self-car-4865661__340.jpg',
  'https://cdn.pixabay.com/photo/2020/03/14/14/07/asia-4930731__340.jpg',
  'https://cdn.pixabay.com/photo/2020/03/14/14/07/asia-4930728__340.jpg',
  'https://cdn.pixabay.com/photo/2020/07/09/13/05/coconut-5387269__480.jpg',
  'https://cdn.pixabay.com/photo/2019/09/19/14/27/webinar-4489399__340.jpg',
  'https://cdn.pixabay.com/photo/2017/02/04/23/00/laptop-2038734__340.jpg',
  'https://cdn.pixabay.com/photo/2020/10/03/11/08/girl-5623231__340.jpg',
  'https://cdn.pixabay.com/photo/2020/10/04/18/33/spring-5627203__340.jpg',
  'https://cdn.pixabay.com/photo/2020/10/01/16/40/lanterns-5619046__340.jpg',
  'https://cdn.pixabay.com/photo/2020/09/21/21/24/landscape-5591270__340.jpg',
];
export default pictures;
