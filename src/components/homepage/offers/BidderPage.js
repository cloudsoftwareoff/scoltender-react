import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs, orderBy, getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../services/firebase";

const BiddersPage = () => {
  const { offerId } = useParams();
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBidders = async () => {
      try {
        setLoading(true);
        const bidsQuery = query(
          collection(firestore, "bids"),
          where("offerId", "==", offerId),
          orderBy("amount", "asc")
        );
        const bidsSnapshot = await getDocs(bidsQuery);
        const bidderList = await Promise.all(
          bidsSnapshot.docs.map(async (bidDoc) => {
            const bidData = bidDoc.data();
            const bidderId = bidData.bidder;
            const userDoc = await getDoc(doc(firestore, "users", bidderId));
            const userData = userDoc.data();
            return {
              id: bidDoc.id,
              amount: bidData.amount,
              bidder: bidderId,
              bidderName: userData.name,
              bidderPfp: userData.profileImageUrl,
            };
          })
        );
        setBidders(bidderList);
      } catch (error) {
        console.error("Error fetching bidders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBidders();
  }, [offerId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bidders List</h1>
      {bidders.length > 0 ? (
        <ul className="list-group">
          {bidders.map((bidder) => (
            <li key={bidder.id} className="list-group-item">
              <div className="d-flex align-items-center">
                <img src={bidder.bidderPfp} 
                  style={{ width: '150px', height: '150px' }}
                className="rounded-circle profile-image" alt="Profile" />
                <div className="ml-3">
                  <h5>{bidder.bidderName}</h5>
                  <p>Amount: ${bidder.amount}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No bids available</p>
      )}
    </div>
  );
};

export default BiddersPage;
