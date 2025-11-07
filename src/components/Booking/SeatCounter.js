// Add this simple counter component for use in ReviewBookingPage
import { Plus, Minus } from 'lucide-react'; 

const SeatCounter = ({ count, setCount, maxSeats }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--simba-light-grey)', paddingTop: '1rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--simba-text-dark)' }}>Selected Seats:</span>
            
            <button 
                onClick={() => setCount(c => Math.max(1, c - 1))}
                disabled={count <= 1}
                style={{ 
                    background: 'var(--simba-light-grey)', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '0.5rem', 
                    cursor: 'pointer' 
                }}
            >
                <Minus size={18} />
            </button>
            <span style={{ fontWeight: 700 }}>{count}</span>
            <button 
                onClick={() => setCount(c => Math.min(maxSeats, c + 1))}
                disabled={count >= maxSeats}
                style={{ 
                    background: 'var(--simba-light-grey)', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '0.5rem', 
                    cursor: 'pointer' 
                }}
            >
                <Plus size={18} />
            </button>
            <span style={{ color: 'var(--simba-text-medium)', fontSize: '0.85rem' }}> (Max: {maxSeats})</span>
        </div>
    );
};
export default SeatCounter;