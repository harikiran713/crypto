import React, {useState} from"react"
import "../css_files/sha256.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Home from "./home";
function Sha256()
{    
    const [redirecttohome, setredirecttohome] = useState(false);

    const [input, setinput] = useState([])
    const hash_256=()=>{
        let input_sha256=document.getElementById('input_sha256_id')
        setinput(input_sha256.value)

        var sha256Hash = crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));

        sha256Hash.then(function(hashBuffer)
        {
            var hashArray = Array.from(new Uint8Array(hashBuffer));
            var hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            document.getElementById("output_sha256_id").textContent = hashHex;
        });
    }
    const go_back = () => {
        setredirecttohome(true);
        };
        if (redirecttohome) {
          return <Home />;
      }
    return (
        <>
        <div onClick={go_back} className="go_back_256"><ArrowBackIcon/></div>
            <p className="head_sha256">SHA-256</p>
            <p className="para_sha256">SHA-256 is known for its strength and is
             commonly used in various security applications, including password
              hashing, digital certificates, and blockchain technology, to ensure
               the integrity and security of data.</p>
            <div className="in_out_container_256">
                <textarea onChange={hash_256} id="input_sha256_id"  className="input_sha256" name="" cols="30" rows="10" placeholder="Input text here..."></textarea>
                <textarea className="output_sha256" id="output_sha256_id" cols="30" rows="10" placeholder="Output..." readOnly></textarea>
            </div>

        </>
    )
}

export default Sha256