

const AboutPage = () => {

    const info = [
        {
            name: "Jimmy Vo",
            role: "Project Lead",
            bio: "<STUFF ABOUT JIMMY",
            github: "",
            linkedIn: "",
            fullstack: "",
            javascript: "",
            picture: ""
        },
        {
            name: "Justin Kilburn",
            role: "Backend Lead",
            bio: "<STUFF ABOUT Justin",
            github: "",
            linkedIn: "",
            fullstack: "",
            javascript: "",
            picture: ""
        },
        {
            name: "Ming Zhang",
            role: "Frontend Lead",
            bio: "<STUFF ABOUT Ming",
            github: "",
            linkedIn: "",
            fullstack: "",
            javascript: "",
            picture: ""
        }
    ]

    return (
        <div className="aboutContainer">
            <div className="aboutProjectContainer">
                <p>"Stuff about the project."</p>
            </div>
            <ul className="aboutUsContainer">
                {info.map(developer => (
                    <li>
                        <img src={developer.picture} alt=""/>
                        <h2>{developer.name}</h2>
                        <h3>{developer.role}</h3>
                        <p>{developer.bio}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AboutPage