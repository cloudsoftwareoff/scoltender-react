import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../services/firebase';
import { Button, Spinner, Badge, Card } from 'react-bootstrap';
import './style.css';

const OfferDetail = () => {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const offerDoc = await getDoc(doc(firestore, 'opportunities', offerId));
        if (offerDoc.exists()) {
          setOffer(offerDoc.data());

          const creatorDoc = await getDoc(doc(firestore, 'users', offerDoc.data().createdBy));
          if (creatorDoc.exists()) {
            setCreator(creatorDoc.data());
          }
        } else {
          console.error('العرض غير موجود');
        }
      } catch (error) {
        console.error('خطأ في جلب تفاصيل العرض:', error);
      }
    };

    fetchOfferDetails();
  }, [offerId]);

  if (!offer || !creator) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (

   
    <div className="offer-detail-container container mt-5 right">
      <Button variant="primary" onClick={() => navigate(-1)}>العودة</Button>
      <Card className="mt-3">
        <Card.Header>
          <h1>{offer.title}</h1>
        </Card.Header>
        <Card.Body>
          <Card.Text>
     <strong>الوصف:</strong>      {offer.description}
          </Card.Text>
          {/* <Card.Text>
            <strong>الميزانية:</strong> {offer.budget}د
          </Card.Text> */}
          <Card.Text>
            <strong>تاريخ الانتهاء:</strong> {offer.endDate.toDate().toLocaleDateString()}
          </Card.Text>
          <div className="mb-3">
            {offer.tags && offer.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="me-2 mb-2">{tag.trim()}</Badge>
            ))}
          </div>
          <h3>معلومات عن المنشئ</h3>
          <img
            src={creator.profileImageUrl}
            alt="الملف الشخصي"
            className="img-fluid border rounded"
            style={{ width: '100px', height: '100px' }}
          />
          <Card.Text>
          <strong>الاسم:</strong>  {creator.name}
          </Card.Text>
          <Card.Text>
          <strong>البريد الإلكتروني:</strong> {creator.email} 
          </Card.Text>
          <Card.Text>
            <strong>الهاتف:</strong> {creator.phoneNumber}
          </Card.Text>
         
        </Card.Body>
      </Card>
    </div>
   
  );
};

export default OfferDetail;
