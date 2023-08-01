import { useState, useEffect, useContext } from 'react';
import { InnerTraining } from './Training';
import { TrainingCard } from './Training';
import { TrainingCardTop } from './Training';
import { TrainingCardMid } from './Training';
import { TrainingCardBot } from './Training';
import { Training } from './Training';
import { useNavigate, Link } from 'react-router-dom'
import { fetchURL } from '../App'

export default function Card(props) {


    const [requiredTraining, setRequiredTraining] = useState([])

    useEffect(() => {
        console.log('props:', props.endp)
        fetchRequiredTraining();
    }, []);

    const fetchRequiredTraining = async () => {
        try {
            const response = await fetch(`http://${fetchURL}/requiredTraining/${props.endp}`);
            const data = await response.json();
            setRequiredTraining(data);
        } catch (error) {
            console.error('Error fetching your required training', error);
        }
    };


    return(
            <InnerTraining>
                    {requiredTraining.map((training, index) =>
                    <TrainingCard
                    key={index}
                    secondaryAction={
                        <Link to={`/required-training/${training.id}`}>
                        </Link>
                    }
                    >
                        <TrainingCardTop>
                        </TrainingCardTop>
                        <TrainingCardMid className='mid'>
                            <p>{training.type_name}</p>
                            <h3>{training.name}</h3>
                        </TrainingCardMid>
                        <TrainingCardBot>
                        </TrainingCardBot>
                    </TrainingCard> )}
                </InnerTraining>
)}