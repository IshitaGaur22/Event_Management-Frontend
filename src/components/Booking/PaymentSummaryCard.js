import { CreditCard } from 'lucide-react';

const PaymentSummaryCard = ({ totalAmount, onPaymentAdd }) => (
    <div className="page-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--simba-orange-dark)', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--simba-light-grey)', paddingBottom: '0.5rem' }}>
            <CreditCard size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Payment Summary
        </h3>

        <div className="detail-item" style={{justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid var(--simba-text-dark)', paddingTop: '1rem'}}>
            <span style={{ color: 'var(--simba-brown-dark)', fontSize: '1.2rem', fontWeight: 600 }}>Total Due: </span>
            <span style={{ color: 'var(--simba-orange-light)', fontSize: '1.2rem', fontWeight: 700}}>₹{totalAmount.toFixed(2)}</span>
        </div>

        <button
            onClick={onPaymentAdd}
            className="book-button"
            style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', backgroundColor: 'var(--simba-orange-dark)', color: 'var(--simba-white)', fontWeight: 600, fontSize: '1.1rem', borderRadius: '10px var(--simba-radius-soft)', border: '2px solid var(--simba-orange-dark)', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.2s ease' }}
        >
            Confirm Payment of ₹{totalAmount.toFixed(2)}
        </button>
    </div>
);
export default PaymentSummaryCard;