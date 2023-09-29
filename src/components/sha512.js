import React, {useState} from"react"
import "../css_files/sha512.css"
function Sha512()
{    
    const [input, setinput] = useState([])

    const hash_512=()=>{
        let input_sha512=document.getElementById('input_sha512_id')
        setinput(input_sha512.value)

        var sha512Hash = crypto.subtle.digest("SHA-512", new TextEncoder().encode(input));

        sha512Hash.then(function(hashBuffer) {
            var hashArray = Array.from(new Uint8Array(hashBuffer));
            var hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            document.getElementById("output_sha512_id").textContent = hashHex;
        });
    }
    return (
        <>
            <p className="head_sha512">SHA-512</p>
            <p className="para_sha512">It is considered more secure and resistant to brute-force 
            attacks than SHA-256 due to its larger output size. SHA-512 is often used in security-sensitive 
            applications where a higher level of security is required, such as digital signatures, 
            password hashing, and data integrity verification.</p>
            <div className="in_out_container_512">
                <textarea onChange={hash_512} id="input_sha512_id"  className="input_sha512" name="" cols="30" rows="10" placeholder="Input text here..."></textarea>
                <textarea className="output_sha512" id="output_sha512_id" cols="30" rows="10" placeholder="Output..." readOnly></textarea>
            </div>

        </>
    )
}

export default Sha512