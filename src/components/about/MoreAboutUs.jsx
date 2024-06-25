import React from 'react';

const MoreAboutUs = () => {
  return (
    <html lang="ar" dir="rtl">
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
        
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/women_pc.jpg" alt="MoreAboutUs 1" />
              </div>
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/deal1.jpg" alt="MoreAboutUs 2" />
              </div>
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/deal_3.jpg" alt="MoreAboutUs 3" />
              </div>
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/women_happy.jpg" alt="MoreAboutUs 4" />
              </div>
            </div>
          </div>

          {/* Right Section with Text */}
          <div className="col-lg-6">
            <div className="MoreAboutUs-content">
              <h1 className="mb-4 text-right">مرحبًا بكم في ScolTender</h1>
              <p className="mb-4 text-right">ScolTender هو سوق إلكتروني رائد يربط بين المؤسسات والمتعاقدين في بيئة موثوقة وفعالة. هدفنا هو تسهيل عمليات الشراء والعقود لتلبية احتياجات المؤسسات بشكل أكثر فعالية وكفاءة.</p>
              
              <h2 className="mb-4 text-right">مهمتنا</h2>
              <p className="mb-4 text-right">توفير منصة آمنة وسهلة الاستخدام تتيح للمؤسسات نشر احتياجاتها وتلقي عروض تنافسية من المتعاقدين، مما يسهم في تحسين عمليات الشراء والاختيار في السوق.</p>
              
              <h2 className="mb-4 text-right">رؤيتنا</h2>
              <p className="mb-4 text-right">أن نصبح الوجهة الأولى للمؤسسات والمتعاقدين في عمليات الشراء والعقود، من خلال تقديم حلول مبتكرة ودعم متميز لكافة مستخدمينا.</p>
              
              <h2 className="mb-4 text-right">ميزات ScolTender</h2>
              <ul className="list-unstyled text-right">
                <li><i className="fa fa-check text-primary me-2"></i> نشر احتياجات الشراء بسهولة وسرعة.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> تصفح الفرص المنشورة وتقديم العطاءات بسهولة.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> عملية مبسطة من نشر الفرص إلى منح العقود.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> منصة آمنة وموثوقة لجميع المستخدمين.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> دعم فني متواصل لضمان رضا العملاء.</li>
              </ul>
              
              <h2 className="mb-4 text-right">فوائد للمؤسسات</h2>
              <ul className="list-unstyled text-right">
                <li><i className="fa fa-check text-primary me-2"></i> الحصول على عروض تنافسية من مختلف المتعاقدين.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> تحسين عملية اختيار الموردين والمتعاقدين.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> توفير الوقت والجهد في عملية الشراء.</li>
              </ul>
              
              <h2 className="mb-4 text-right">فوائد للمتعاقدين</h2>
              <ul className="list-unstyled text-right">
                <li><i className="fa fa-check text-primary me-2"></i> الوصول إلى فرص متعددة ومتنوعة.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> تقديم العروض بسهولة ومتابعة حالة العطاءات.</li>
                <br/>
                <li><i className="fa fa-check text-primary me-2"></i> زيادة فرص الفوز بالعقود الجديدة.</li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
    </html>
  );
};

export default MoreAboutUs;
