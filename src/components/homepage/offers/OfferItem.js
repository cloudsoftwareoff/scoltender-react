import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box, Chip } from "@material-ui/core";
import {
  getDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../../../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const OfferItem = ({ offer }) => {
  const [open, setOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [userBid, setUserBid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [lowestBidderName, setLowestBidderName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBid = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(
            doc(firestore, "users", auth.currentUser.uid)
          );
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }

        const bidsQuery = query(
          collection(firestore, "bids"),
          where("offerId", "==", offer.id),
          where("bidder", "==", auth.currentUser.uid)
        );
        const bidsSnapshot = await getDocs(bidsQuery);
        if (!bidsSnapshot.empty) {
          const userBidData = bidsSnapshot.docs[0].data();
          setUserBid(userBidData);
        }

        if (offer.lowestBid) {
          const bidderDoc = await getDoc(
            doc(firestore, "users", offer.lowestBid.bidder)
          );
          if (bidderDoc.exists()) {
            setLowestBidderName(bidderDoc.data().name);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (auth.currentUser) {
      fetchUserBid();
    }
  }, [offer.id, offer.lowestBid]);

  const handleOpen = () => {
    if (auth.currentUser) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => setOpen(false);

  const handleBidSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBid = {
        offerId: offer.id,
        bidder: auth.currentUser.uid,
        amount: parseFloat(bidAmount),
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(firestore, "bids"), newBid);
      setUserBid(newBid);
      setBidAmount("");
      handleClose();
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
  };

  const hasEnded = new Date() > offer.endDate;

  return (
   
    <div className="job-item p-4 mb-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-8 d-flex align-items-center">
          <img
            className="flex-shrink-0 img-fluid border rounded"
            src={offer.photoURL !=null ? offer.photoURL : offer.createdBy.profileImageUrl}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <div className="text-right ps-4 ">
          <h5 className="mb-3 pr-3">  {offer.title}   </h5>
{/* <h6 className="mb-2 pr-2">  {offer.description}   </h6> */}


            <div className="d-flex flex-wrap">
              {offer.tags &&
                offer.tags.map((tag, index) => (
                  <Chip key={index} label={tag.trim()} className="me-2 mb-2" />
                ))}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
          <div className="d-flex mb-3">
            {hasEnded ? (
              offer.lowestBid ? (
                <div>
                  <div className="row">
                  <div className="col-md-6">
                      <Button
                        component={Link}
                        to={`/bidders/${offer.id}`}
                        variant="contained"
                        color="primary"
                      >
                        عرض العروض
                      </Button>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-0">أقل عرض: {offer.lowestBid.amount}د</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-0">الفائز: {lowestBidderName}</p>
                    </div>
                  
                  </div>
                </div>
              ) : (
                <p>لا توجد عروض متاحة</p>
              )
            ) : userBid ? (
              <div>
                <p>عرضك: {userBid.amount}د</p>
              </div>
            ) : userData && !userData.isVerified ? (
              <p>Unverified account</p>
            ) : userData && userData.role === "contractor" ? (
              <Button variant="contained" color="primary" onClick={handleOpen}>
                تقديم عرض
              </Button>
            ) : null}
          </div>
          {!hasEnded && (
            <small className="text-truncate">
              <i className="far fa-calendar-alt text-primary me-2"></i>تاريخ
              الانتهاء: {offer.endDate.toLocaleDateString()}
            </small>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/offer/${offer.id}`)}
            className="mt-3"
          >
            عرض المزيد
          </Button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>قدم عرضك</h2>
          <form onSubmit={handleBidSubmit}>
            <div className="form-group mb-3">
              <TextField
                label="قيمة العرض"
                type="number"
                fullWidth
                variant="outlined"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group d-flex justify-content-end">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
                style={{ marginRight: "10px" }}
              >
                إلغاء
              </Button>
              <Button type="submit" variant="contained" color="primary">
                تقديم العرض
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
   
  );
};

export default OfferItem;
