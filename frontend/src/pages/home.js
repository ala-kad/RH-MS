import { useEffect, useState } from "react";

const Home =  () => {
    const [members, setMembers] = useState(null)
    useEffect(() => {
        const fetchMembers = async () => {
            const res = await fetch('/members/getAll/')
            console.log(res)
            const json = await res.json()
            if(res.ok){
                setMembers(json)
            }
        }
        fetchMembers()
    }, [])
    return (
        <div className="home">
            <div className="members">
                {members && members.map((members) => (
                    <p key={members._id}> {members.name} </p>
                ))}
            </div>
        </div>
    )
}
export default Home;