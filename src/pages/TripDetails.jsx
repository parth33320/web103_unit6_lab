import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ActivityBtn from '../components/ActivityBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css';

const TripDetails = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: 0,
    title: "",
    description: "",
    img_url: "",
    num_days: 0,
    start_date: "",
    end_date: "",
    total_cost: 0.0
  });
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const result = data.filter((item) => item.id === parseInt(id))[0];
      if (result) {
        setPost({
          id: parseInt(result.id),
          title: result.title,
          description: result.description,
          img_url: result.img_url,
          num_days: parseInt(result.num_days),
          start_date: result.start_date ? result.start_date.slice(0, 10) : "",
          end_date: result.end_date ? result.end_date.slice(0, 10) : "",
          total_cost: result.total_cost
        });
      }
    }

    const fetchActivities = async () => {
      const response = await fetch('/api/activities/' + id);
      const data = await response.json();
      setActivities(data);
    };

    const fetchDestinations = async () => {
      const response = await fetch('/api/trips-destinations/destinations/' + id);
      const data = await response.json();
      setDestinations(data);
    };

    fetchActivities();
    fetchDestinations();
  }, [data, id]);

  return (
    <div className="TripDetails">
      <div className="flex-container">
        <div className="left-side">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <br />
          <p>Total Cost: ${post.total_cost}</p>
          <p>Duration: {post.num_days} days</p>
          <br />
          <p>Destinations:</p>
          {destinations && destinations.length > 0 ? (
            destinations.map((destination) => (
              <DestinationBtn key={destination.id} id={destination.id} destination={destination.destination} />
            ))
          ) : null}
          <br />
          <br />
          <Link to={'/activity/create/' + id}>
            <button className="addActivityBtn">+ Add Activity</button>
          </Link>
          <br />
          <br />
          <p>Activities:</p>
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityBtn key={activity.id} id={activity.id} activity={activity.activity} num_votes={activity.num_votes} />
            ))
          ) : null}
        </div>
        <div className="right-side" style={{ backgroundImage: `url(${post.img_url})` }}></div>
      </div>
    </div>
  );
};

export default TripDetails;
