import SimpleSlider from "../comp/SimpleSlider";
import AwsImage from "../comp/AwsImage";
const homepage = () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url =
    "https://drive.google.com/uc?export=view&id=1frvCU6OrC_xc5BRwKCMHl_Tc0xYZkIH7";
  return (
    <div>
      <h1>Saint Mary's Romanian Orthodox Church</h1>
      <section>
        <SimpleSlider />
      </section>
      <section>
        <h2>Welcome</h2>
        <p>
          Welcome to the website of the Holy Archangels Greek Orthodox
          Monastery! The blessing of the Lord and His Holy Mother, and the
          protection of the Holy Archangels be upon you! The website is designed
          as a humble offering to help pilgrims, friends, inquirers and
          neighbors understand who we are, learn about our history, view updates
          and images from our many construction projects, and much more.
          Additionally, the site contains a variety of photographs from 1996 to
          the present, providing a visual testimony to the work of God that has
          taken place. We are honored to be located in the Texas Hill Country
          and to provide a place of solace in these troubling times. Since our
          founding in 1996, we have provided hospitality to many pilgrims,
          prayers for countless souls, living and departed, and most importantly
          a place for men to come and devote their lives to Christ in the holy
          path of Orthodox monasticism. May the intercessions of the Holy
          Archangels be with you! Archimandrite Dositheos
        </p>
        <h3>Who we are</h3>
        <p>
          Holy Archangels Greek Orthodox Monastery is a cenobitic men’s
          monastery under the Metropolis of Denver. With the blessings of His
          Eminence Metropolitan Isaiah, the monastery was founded by Elder
          Ephraim in 1996. The monastery resides in Kendalia, north of San
          Antonio and west of Austin, located in the heart of Texas.
        </p>
      </section>
      <section>
        <h3>Location: </h3>
        <p>200 Monaco Dr, Cedar Park, TX 78613</p>
        <h2>Schedule of Services: </h2>
        <h4>Fridays</h4>
        <p>10am-2pm Office Hours</p>
        <p>2pm-7pm Confession/Home/Hospital visits</p>
        <h4>Sundays</h4>
        <p>9:30am Orthros/Matins</p>
        <p>10:30am Divine Liturgy</p>
        <p> 12:15pm Lunch</p>
        <a>+++Google Calendar+++</a>
      </section>
      <section>
        <h1>Photo Library</h1>

        <AwsImage imageId={"1frvCU6OrC_xc5BRwKCMHl_Tc0xYZkIH7"} />
      </section>
    </div>
  );
};

export default homepage;
