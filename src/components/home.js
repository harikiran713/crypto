    import React,{useState} from "react";
    import "../css_files/home.css";
    import Sha256 from "./sha256";
    import Sha512 from "./sha512";
    import Password from "./password";
    import Rsa from "./rsa";
    import Des from "./triple_des";
    import back from "./back.jpg"

    function Home()
    {
        const [redirectToSha256, setRedirectToSha256] = useState(false);
        const [redirectToSha512, setRedirectToSha512] = useState(false);
        const [redirectTopassword, setRedirectTopassword] = useState(false);
        const [redirectTorsa, setredirectTorsa] = useState(false);
        const [redirectTodes, setredirectTodes] = useState(false);

        const handleRedirectClick256 = () => {
            setRedirectToSha256(true);
        };
        if (redirectToSha256) {
            return <Sha256 />;
        }
        
        const handleRedirectClick512 = () => {
            setRedirectToSha512(true);
        };
        if (redirectToSha512) {
            return <Sha512 />;
        }

        const handleRedirectClickpass = () => {
            setRedirectTopassword(true);
        };
        if (redirectTopassword) {
            return <Password />;
        }
        const handleRedirectClickrsa = () => {
            setredirectTorsa(true);
        };
        if (redirectTorsa) {
            return <Rsa />;
        }
        const handleRedirectClickdes = () => {
            setredirectTodes(true);
        };
        if (redirectTodes) {
            return <Des/>;
        }

        return (
            <>
            <img className="back_img" src={back} alt="" />
            <div className="overall_parent">
                <p className="web_name">Cryptography</p>
                <p className="web_name_details">Lorem ipsum dolor sit amet consectetur adipisicing.</p>


                <div className="container_home">
                    <div onClick={handleRedirectClick256} className="outer_container_home">
                        <div className="inner_container_home">
                            <p className="inner_container_text">SHA-256</p>
                            
                        </div>
                        <p className="para">SHA-256 is a widely used cryptographic hash algorithm
                        that produces a 256-bit (32-byte) hash value from input data.</p>
                    </div>

                    <div onClick={handleRedirectClick512} className="outer_container_home">
                        <div className="inner_container_home">
                        <p className="inner_container_text">SHA-512</p>
                        </div>
                        <p className="para">SHA-512, a variant of the Secure Hash Algorithm,
                        produces a 512-bit (64-byte) hash value from input data.</p>
                    </div>

                    <div onClick={handleRedirectClickpass} className="outer_container_home">
                        <div className="inner_container_home">
                        <p className="inner_container_text">Password Generator</p>
                        </div>
                        <p className="para">A password generator is a software tool or application designed
                         to create strong and random passwords for users</p>
                    </div>

                    <div onClick={handleRedirectClickrsa} className="outer_container_home">
                        <div className="inner_container_home">
                        <p className="inner_container_text">RSA</p>
                        </div>
                        <p className="para">A password generator is a software tool or application designed
                         to create strong and random passwords for users</p>
                    </div>

                    <div onClick={handleRedirectClickdes} className="outer_container_home">
                        <div className="inner_container_home">
                        <p className="inner_container_text">Triple DES</p>
                        </div>
                        <p className="para">A password generator is a software tool or application designed
                         to create strong and random passwords for users</p>
                    </div>
                </div>
                </div>
            </>
        )
    }
    export default Home