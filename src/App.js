import { FaAngleRight, FaAngleLeft, FaLinkedin, FaGithubSquare, FaFacebookSquare, FaInstagram, FaAngleUp } from 'react-icons/fa';
import './App.scss';
import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

function App() {

  const [data, setData] = useState([]);
  const [work, setWork] = useState([]);
  const [optionState, setOptionState] = useState("fulltime");
  // eslint-disable-next-line
  const [error, setError] = useState(null);  
  const [projects, setProjects] = useState([]);
  const [slide, setSlide] = useState(6); 
  const [temp, setTemp] = useState([]); 
  const [sendMsg, setSendMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [yourText, setYourText] = useState("");
  const [field, setField] = useState(false);
  const [send, setSend] = useState(false); 
  const [topBtn, setTopBtn] = useState(false);
  
  
  useEffect(() =>{   

    fetch('education.json')
      .then((resp) => resp.json())
      .then((newData) => setData([...data, ...newData.education]),
      //console.log(data)      
      )
      .catch(error => {
        console.log("Error can't get data: ", error);
        setError(error);
      })       
      setOptionState("fulltime");
      return () => true;
  // eslint-disable-next-line     
  },[])


  useEffect(() =>{         
    
    fetch('work.json')
      .then((resp) => resp.json())
      .then((newSkill) => 
      setWork([newSkill[optionState]]),
        
      )
      .catch(error => {
        console.log("Error can't get data: ", error);
        setError(error);
      })  
      
      return () => true;
  // eslint-disable-next-line     
  },[optionState])

  useEffect(() =>{

    fetch('projects.json')
      .then((resp) => resp.json())
      .then((newData) => setProjects([...projects, ...newData.projects]),
           
      )
      .catch(error => {
        console.log("Error can't get data: ", error);
        setError(error);
      })     
      return () => true;
  // eslint-disable-next-line     
  },[])
  
 

  useEffect(() =>{    

    let tempArr = [];

    // eslint-disable-next-line
    tempArr = projects.filter(e => e.id == slide);    
    setTemp(tempArr);

    return () => true;
  // eslint-disable-next-line     
  },[projects])



  function moveLeft(){
    setSlide(slide - 1);
    if(slide>1){
      setProjects([...projects]);
    }else{
      setSlide(projects.length);
      setProjects([...projects]);
    }
  };
  
  function moveRight(){
    setSlide(slide + 1);
    if(slide<projects.length){
      setProjects([...projects]);
    }else{
      setSlide(1);
      setProjects([...projects]);
    }
  };

  function sendEmail(){
    console.log(name);
    console.log(email);
    console.log(yourText);

    if(name && email && yourText){
      // eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(re.test(String(email).toLocaleLowerCase())){ 

        let templateParams = {
          formaName: name,
          formaEmail: email,
          yourText: yourText
        };

        emailjs.send('Your Service', 'Your Template', templateParams, 'Your ID')
        .then(function(response) {
            setName("");
            setEmail("");
            setYourText("");
          setSendMsg('Thank you for your email I will get back to you as soon as possible.');
          setSend(true);          

        }, function(error) {
          console.log('FAILED...', error);
        });
          
        }else{
          setField(true);
          setEmail();
          setSendMsg('Invalid Email Address');
        }      
    }
    else{
      if(!name){
        setField(true);
        setSendMsg('All the fields are required');
      }else if(!email){
        setField(true);
        setSendMsg('All the fields are required');
      }else if(!yourText){
        setField(true);
        setSendMsg('All the fields are required');
      }     
    }    
  };

  function showTop(){
    setTopBtn(true);
  }

  function hideTop(){
    setTopBtn(false);
  }

  function unToggle(){
    let checkBoxState = document.getElementById("navi-togle");
      checkBoxState.checked = false;
  }
  
  
  return (
    <div className="App">
      <div className="navigation" id="main-nav">
        <input type="checkbox" className="navigation__checkbox" id="navi-togle" />
          <label htmlFor="navi-togle" className="navigation__button" id="nav-btn">
              <span className="navigation__icon">&nbsp;</span>
          </label> 
          <div className="navigation__background">&nbsp;</div>       
        <nav className="navigation__nav">
          <ul className="navigation__list" id="mobNavList">
            <a className="navigation__item" href="#home" onClick={() => unToggle()}>Home</a>
            <a className="navigation__item" href="#about" onClick={() => unToggle()}>About</a>
            <a className="navigation__item" href="#education" onClick={() => unToggle()}>Education</a>
            <a className="navigation__item" href="#work" onClick={() => unToggle()}>Work</a>   
            <a className="navigation__item" href="#projects" onClick={() => unToggle()}>Projects</a>  
            <a className="navigation__item" href="#contact" onClick={() => unToggle()}>Contact</a>         
          </ul>
        </nav>              
      </div>
      <div className="content">
        <a className={`toTop ${!topBtn ? "invisible" : "visible"}`} href="#home" onClick={hideTop}>
          <div className="toTop-content">
            <FaAngleUp />
          </div>
        </a>
        <div className="head" id="home" onMouseOver={hideTop}>
          <div className="head-overlay">
            <div className="head-overlay-content">
              <div className="head-overlay-content-top">
                <div className="head-overlay-content-top-content">Jasmin Katanic</div>
              </div>
              <div className="head-overlay-content-middle">
                <div className="head-overlay-content-middle-content">Network Engineer | Frontend Developer</div>
              </div>
              <div className="head-overlay-content-bottom">
                <div className="head-overlay-content-bottom-content">
                  <div className="head-overlay-content-bottom-content-inner">
                    <a className="head-overlay-content-bottom-content-inner-item" href="#about">
                      <div className="head-overlay-content-bottom-content-inner-item-content">About</div>
                    </a>
                    <a className="head-overlay-content-bottom-content-inner-item"  href="#education">
                      <div className="head-overlay-content-bottom-content-inner-item-content">Education</div>
                    </a>
                    <a className="head-overlay-content-bottom-content-inner-item" href="#work">
                      <div className="head-overlay-content-bottom-content-inner-item-content">Work</div>
                    </a>
                    <a className="head-overlay-content-bottom-content-inner-item" href="#projects">
                      <div className="head-overlay-content-bottom-content-inner-item-content">Projects</div>
                    </a>
                    <a className="head-overlay-content-bottom-content-inner-item" href="#contact">
                      <div className="head-overlay-content-bottom-content-inner-item-content">Contact</div>
                    </a>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about" id="about">
          <div className="about-content">
            <div className="about-content-left">
              <div className="about-content-left-img">
                <img src={process.env.PUBLIC_URL + '/jk-dev-small.jpg'} alt="jasmin-katanic" />
              </div>
            </div>
            <div className="about-content-right">
              <div className="about-content-right-top">
                <div className="about-content-right-top-content">Hi there</div>
              </div>
              <div className="about-content-right-middle">
                <div className="about-content-right-middle-content">
                  <div className="about-content-right-middle-content-top">
                    <p>My name is Jasmin Katanic, I am an IT engineer from Bosnia and Herzegovina. I am a motivated engineer who likes to create things and solve problems.</p>
                    <br></br><p>For the past 6 years I have been working in Salt Mine Tuzla as a Network and System engineer, I have worked on many interesting projects regarding industrial automation, communication, administrative automation etc.</p>
                    <br></br><p>But my real passion was always software creation and deployment, if you think I might be a good fit for you or your company then contact me and let’s make some interesting stuff.</p>
                  </div>
                  <div className="about-content-right-middle-content-bottom">
                    <a className="about-content-right-middle-content-bottom-content" href="#contact">
                      <div className="about-content-right-middle-content-bottom-content-text">Get In Touch!</div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="about-content-right-bottom">
                <div className="about-content-right-bottom-content">
                  <p>P.S. Thank you for taking a moment from your busy schedule to look at my website.</p>
                  <br></br><p>Have a wonderful day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="education" id="education" onMouseOver={showTop}>
          <div className="education-overlay">
            {data.map((item, index) => 
              <div className="education-overlay-content" key={item.details[index].title}>
              <div className="education-overlay-content-top">
                <div className="education-overlay-content-top-content">{item.level}</div>
              </div>
              {item.details.map((item) => 
                <div className="education-overlay-content-bottom" key={item.title}>
                  <div className="education-overlay-content-bottom-content">
                    <div className="education-overlay-content-bottom-content-title">{item.title}</div>
                    <div className="education-overlay-content-bottom-content-institution">{item.institution}</div>
                    <div className="education-overlay-content-bottom-content-duration">{item.duration}</div>
                  </div>
              </div>
              )}              
            </div>
            )}            
          </div>          
        </div>
        <div className="work" id="work" onMouseOver={showTop}>
          <div className="work-content">
            <div className="work-content-left">
              <div className="work-content-left-content">
                <div className="work-content-left-content-first">
                  <div className="work-content-left-content-first-content">
                    I have over 6 years of various IT experience ranging from frontend development, network deployment, system administration all the way to tech support, I have worked Full-Time, Part-Time and I have freelanced as well. Over the years I have expanded my skill tree and I have acquired knowledge from both IT domain and other fields such as maintenance of mining measuring equipment, preforming complex measurements and other.  
                  </div>
                </div>
                <div className="work-content-left-content-second">
                  <select className="work-content-left-content-second-content" value={optionState} onChange={e => setOptionState(e.currentTarget.value)}>
                    <option value="fulltime">Full-Time</option>
                    <option value="freelance">Freelance</option>
                    <option value="training">Training</option>
                  </select>
                </div>
                <div className="work-content-left-content-third">
                  <div className="work-content-left-content-third-content">
                    For any additional information regarding my education as well as my work experience you can download my CV bellow. <a className="work-content-left-content-third-content-span" href="#contact">Or get in Contact!</a>
                  </div>
                </div>
                <div className="work-content-left-content-fourth">
                  <a className="work-content-left-content-fourth-content" href={process.env.PUBLIC_URL + '/Jasmin_Katanic_CV.pdf'} download>
                    <div className="work-content-left-content-fourth-content-text">Download CV</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="work-content-right">
              {work.map((item) => 
                <div className="work-content-right-content" key={item}>
                <div className="work-content-right-content-first">
                  <div className="work-content-right-content-first-content">{item.type}</div>
                </div>
                {item.details.map((item) => 
                  <div className="work-content-right-content-second" key={item.keyProp}>
                    <div className="work-content-right-content-second-company">
                      <div className="work-content-right-content-second-company-content">{item.company}</div>
                    </div>
                    <div className="work-content-right-content-second-location">
                      <div className="work-content-right-content-second-location-content">{item.location}</div>
                    </div>
                    <div className="work-content-right-content-second-duration">
                      <div className="work-content-right-content-second-duration-content">{item.duration}</div>
                    </div>
                    {item.more.map((item) => 
                      <ul className="work-content-right-content-second-list" key={item}>
                        {item.responsibilities.map((item) => 
                          <li className="work-content-right-content-second-list-item" key={item}>{item}</li>
                        )}                        
                      </ul>
                    )}                    
                  </div>
                )}
              </div>
              )}            
            </div>
          </div>
        </div>
        <div className="projects" id="projects" onMouseOver={showTop}>
          <div className="projects-overlay">
            <div className="projects-overlay-top">
              <div className="projects-overlay-top-content">Projects</div>
            </div>
            <div className="projects-overlay-content">
              <div className="projects-overlay-content-left" onClick={() => moveLeft()}>
                <div className="projects-overlay-content-left-content">
                  <FaAngleLeft />
                </div>
              </div>
              
              {temp.map((item) =>
                <div className="projects-overlay-content-center" key={item.id}>
                  <div className="projects-overlay-content-center-img">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="projects-overlay-content-center-head">
                    <div className="projects-overlay-content-center-head-content">{item.title}</div>
                  </div>
                  <div className="projects-overlay-content-center-description">
                    <div className="projects-overlay-content-center-description-content">{item.description}</div>
                  </div>
                  <div className="projects-overlay-content-center-technologies">
                    <div className="projects-overlay-content-center-technologies-content">Technologies: {item.technologies}</div>
                  </div>
                  <div className="projects-overlay-content-center-links">
                    <a className="projects-overlay-content-center-links-left" href={item.webUrl} target="_blank" rel="noreferrer">
                      <div className="projects-overlay-content-center-links-left-content">Website</div>
                    </a>
                    <a className="projects-overlay-content-center-links-right" href={item.gitUrl} target="_blank" rel="noreferrer">
                      <div className="projects-overlay-content-center-links-right-content">Git</div>
                    </a>
                  </div>
                </div>
              )}
               
              
                
                         
              <div className="projects-overlay-content-right" onClick={() => moveRight()}>
                <div className="projects-overlay-content-right-content">
                  <FaAngleRight />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact" id="contact" onMouseOver={showTop}>
          <div className="contact-content">
            <div className="contact-content-top">
              <div className="contact-content-top-content">
                <div className="contact-content-top-content-text">Get in Touch</div>
              </div>
            </div>
            <div className="contact-content-pre">
              <div className="contact-content-pre-content">
                <div className="contact-content-pre-content-text">
                  <p>First of all thank you for making it all the way to the contact page, it means a lot to me that you have taken a portion of your time to view my website. If you think I might be a good fit for you or your company or if you just saw something on my website that you liked please don’t hesitate to contact me.</p>
                </div>
              </div>
            </div>
            <div className="contact-content-form">
              <div className="contact-content-form-content">
              <label htmlFor="fullName" className={`contact-content-form-content-label ${send ? "succesMsg" : ""}`}>{sendMsg}</label>
                <input type="text" name="formaName" id="nameInput" className={`contact-content-form-content-input ${!name&&field ? "missingData" : ""}`} placeholder=" Full Name" value={name} onChange={e => setName(e.target.value)}></input>
                <input type="email" name="formaEmail" id="emailInput" className={`contact-content-form-content-input ${!email&&field ? "missingData" : ""}`} placeholder=" Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <textarea id="textInput" name="yourText" className={`contact-content-form-content-text ${!yourText&&field ? "missingData" : ""}`} placeholder=" Your Text" value={yourText} onChange={e => setYourText(e.target.value)}></textarea>
                <div className="contact-content-form-content-btn" onClick={() => sendEmail()}>
                  <div className="contact-content-form-content-btn-text">Send</div>
                </div>
                <div className="contact-content-form-content-social">
                  <div className="contact-content-form-content-social-content">
                    <a className="contact-content-form-content-social-content-item" href="https://www.linkedin.com/in/jasmin-katanic/" target="_blank" rel="noreferrer">
                      <div className="contact-content-form-content-social-content-item-content">
                        <FaLinkedin />
                      </div>
                    </a>
                    <a className="contact-content-form-content-social-content-item" href="https://github.com/jasminkatanic" target="_blank" rel="noreferrer">
                      <div className="contact-content-form-content-social-content-item-content git">
                        <FaGithubSquare />
                      </div>
                    </a>
                    <a className="contact-content-form-content-social-content-item" href="https://www.facebook.com/jasmin.katanic/" target="_blank" rel="noreferrer">
                      <div className="contact-content-form-content-social-content-item-content facebook">
                        <FaFacebookSquare />
                      </div>
                    </a>
                    <a className="contact-content-form-content-social-content-item" href="https://www.instagram.com/jasmin.katanic/" target="_blank" rel="noreferrer">
                      <div className="contact-content-form-content-social-content-item-content instagram">
                        <FaInstagram />
                      </div>
                    </a>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
