import { carlos, fede, gian, gina, git, ire, juanjo, linkedin, nico, tobias } from "@/assets";
import styles from "./css.module.css";

export const About = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>El molino</h2>
      <h5>Equipo de trabajo</h5>
      <div className={styles.cartas}>


        <div className={styles.carta}>
          <img className={styles.foto} src={juanjo} alt="" />
          <h3 className={styles.name}>Juan Jose Montilla</h3>
          <div>
            <a className={styles.img} href="https://github.com/Juanjo740" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/juanjosemontilla/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>


        <div className={styles.carta}>
          <img className={styles.foto} src={ire} alt="" />
          <h3 className={styles.name}>Ire</h3>
          <div>
            <a className={styles.img} href="https://github.com/Ildik0-0" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/iremar-rivas-953b64235/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>




        <div className={styles.carta}>
          <img className={styles.foto} src={nico} alt="" />
          <h3 className={styles.name}>nico</h3>
          <div>
            <a className={styles.img} href="https://github.com/NGSalvo" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/nicolas-salvo/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>



        <div className={styles.carta}>
          <img className={styles.foto} src={gina} alt="" />
          <h3 className={styles.name}>gina</h3>
          <div>
            <a className={styles.img} href="https://github.com/GinaLoaizaH" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/ginaloaiza/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>

        <div className={styles.carta}>
          <img className={styles.foto} src={carlos} alt="" />
          <h3 className={styles.name}>carlos</h3>
          <div>
            <a className={styles.img} href="https://github.com/CERP27" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/cerp279/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>



        <div className={styles.carta}>
          <img className={styles.foto} src={fede} alt="" />
          <h3 className={styles.name}>lefe</h3>
          <div>
            <a className={styles.img} href="https://github.com/LeFede" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/lefede/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>




        <div className={styles.carta}>
          <img className={styles.foto} src={tobias} alt="" />
          <h3 className={styles.name}>yo</h3>
          <div>
            <a className={styles.img} href="https://github.com/crtobias" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/tobias-gonzalez-arriola-0a2399273/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>



        <div className={styles.carta}>
          <img className={styles.foto} src={gian} alt="" />
          <h3 className={styles.name}>gian</h3>
          <div>
            <a className={styles.img} href="https://github.com/GianGrav" target="_blank">
                <img className={styles.img} src={git} alt="github" />
            </a>
            <a className={styles.img} href="https://www.linkedin.com/in/giancarlo-gravagna-19269926a/" target="_blank">
                 <img className={styles.img}src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>





      </div>
    </section>
  );
};
