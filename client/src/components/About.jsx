import React from "react";
import "../scss/About.scss";
import NavBar from "./NavBar/NavBar";
import text from "./text.js";
import logo from '../assets/LOGUITO-PF.svg'

const img =
  "https://lasillarotarm.blob.core.windows.net/images/2020/11/20/barackobama.jpg";

export default function About() {
  return (
    <div className="About">
      <div className="Head">
        <div className="Logo">
          <img src={logo} />
        </div>
        <div className="Text">
          <h1 className="TitleAbout">¿Quienes somos?</h1>
          <h3 className="TextAbout">{text}</h3>
        </div>
      </div>
      <div className="Staff">
        <h1 className="StaffText">Nuestro Staff...</h1>
        <div className="Members">
          <div className="Member">
            <img src={"https://miro.medium.com/max/1400/1*OBZJJYHDPSWnsGxa3DLxIg.jpeg"} />
            <div className="Member-Text">
              <h1>Mariano</h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://www.emprendedores.es/wp-content/uploads/2021/05/De-emprendedor-a-empresario.jpg"} />
            <div className="Member-Text">
              <h1>Enzo </h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://frasesdelavida.com/wp-content/uploads/2022/03/handsome-young-business-man-standing-confident-in-the-office-picture-id1324904314.jpg"} />
            <div className="Member-Text">
              <h1>Agustín</h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://cdn.masmovil.es/embed/99970c12b9cc790832d681b046f1600774017/Empresarios-de-exito-a-los-que-deberias-seguir-en-Instagram.jpg?imagick=1&size=750"} />
            <div className="Member-Text">
              <h1>Tomás </h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://www.euroresidentes.com/empresa/gestion/wp-content/uploads/sites/15/2007/10/empresarios-mediaticos.jpg"} />
            <div className="Member-Text">
              <h1>Juan</h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVSIjyGCPy5-BKnZkQcCrGLWGiqt9I7K6sJODk-BDpUJDk7mOg-nxqXq1oQgpB0Apy9A&usqp=CAU"} />
            <div className="Member-Text">
              <h1>Bautista</h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV26eKPcB-oSoJ5cCV8ipBjGJpgLccaxs2_LNKq-cbuKylYw3mO_AtuTPccKII8vk1S4w&usqp=CAU"} />
            <div className="Member-Text">
              <h1>Franco</h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
          <div className="Member">
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSrTiq71o4qv9Crbw5iS_v7x-ASYn4wYsWcIdAF2E4aAAvzcJgitVlWuLQ8ssImlgbkBc&usqp=CAU"} />
            <div className="Member-Text">
              <h1>Juan</h1>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                expedita, incidunt necessitatibus vitae ipsam aliquid. Pariatur
                porro recusandae in. Cum, facilis assumenda? Magni aliquam
                reprehenderit eum nemo quod quae fuga.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
