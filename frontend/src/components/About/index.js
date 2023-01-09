import "./AboutPage.css";

const AboutPage = () => {
  const info = [
    {
      name: "Jimmy Vo",
      role: "Project Lead",
      bio: "<STUFF ABOUT JIMMY>",
      github: "https://github.com/jimmyvo39",
      linkedIn: "https://www.linkedin.com/in/jimmy-vo-02a5043b/",
      fullstack: "https://question-queue.onrender.com/",
      fsName: "Question Queue",
      javascript: "https://jimmyvo39.github.io/Breath-First-Search/",
      jsname: "Breath First Search",
      picture: "jimmy.png",
      wellfound: "https://angel.co/u/jimmy-vo-11"
    },
    {
      name: "Justin Kilburn",
      role: "Backend Lead",
      bio: "<STUFF ABOUT Justin>",
      github: "https://github.com/Thatmoonman",
      linkedIn: "https://www.linkedin.com/in/justin-kilburn-3aa38a54/",
      fullstack: "https://hobbypin.onrender.com/",
      fsName: "Hobbypin",
      javascript: "https://thatmoonman.github.io/FENCES/",
      jsname: "FENCES",
      picture: "justin.png",
      wellfound: "https://angel.co/u/justin-kilburn"
    },
    {
      name: "Ming Zhang",
      role: "Frontend Lead",
      bio: "<STUFF ABOUT Ming>",
      github: "https://github.com/MingZmk2",
      linkedIn: "https://www.linkedin.com/in/mingzhang8/?_l=en_US",
      fullstack: "https://etzy.onrender.com/",
      fsName: "Etzy",
      javascript: "https://mingzmk2.github.io/Operation-Helix/",
      jsname: "Operation Helix",
      picture: "ming.png",
      wellfound: "/"
    },
  ];

  return (
    <div className="aboutContainer">
      <div className="aboutProjectContainer">
        <p>
          "reBindr is a web application that helps you set up and manage
          reminders for tasks and events. It offers a quick and easy way to
          create notifications, and allows you to include others in your
          reminders. You can also upload information and links related to your
          devices and tasks. With reBindr, you can stay organized and on top of
          the things that matter in your life."
        </p>
      </div>
      <ul className="aboutUsContainer">
        {info.map((developer) => (
          <li key={developer.name} className="aboutCard">
            <div className="aboutPictureContainer">
              <img src={developer.picture} alt="" />
            </div>
            <div className="aboutDetailsContainer">
              <h2>{developer.name}</h2>
              <h3>{developer.role}</h3>
            </div>
            <div className="aboutLinksContainer">
              <a href={developer.github} target="_blank">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href={developer.linkedIn} target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href={developer.wellfound} target="_blank">
              <i className="fa-brands fa-angellist"></i>
              </a>
            </div>
            <ul className="aboutProjectsContainer">
              <li className="projects">PROJECTS:</li>
              <li>
                Fullstack <i class="fa-regular fa-hand-point-right"></i>{" "}
                <a
                  className="projectLinks"
                  href={developer.fullstack}
                  target="_blank"
                >
                  {developer.fsName}
                </a>
              </li>
              <li>
                Javascript <i class="fa-regular fa-hand-point-right"></i>{" "}
                <a
                  className="projectLinks"
                  href={developer.javascript}
                  target="_blank"
                >
                  {developer.jsname}
                </a>
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <div className="githubLink">
        <a href="https://github.com/jimmyvo39/reBindr">Github Repo</a>
      </div>
    </div>
  );
};

export default AboutPage;
