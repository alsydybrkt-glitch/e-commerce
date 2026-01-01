import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

import {
  remove,
  resetCart,
  increaseQty,
  decreaseQty,
  applyDiscount,
  selectFinalTotal,
} from "../../Redux/ReduxSlices/cardReducer";
import PageTransitions from "../../component/pageTransition";

import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardReducer.cards);
  const totalPrice = useSelector(selectFinalTotal);
  const discount = useSelector((state) => state.cardReducer.discount);

  const [promo, setPromo] = useState("");

  const handlePromo = () => {
    if (promo === "SAVE10") {
      dispatch(applyDiscount(10));
      setPromo("");
    } else if (promo === "SAVE20") {
      dispatch(applyDiscount(20));
      setPromo("");
    } else {
      alert("Invalid promo code");
    }
  };

  if (cards.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p>Start shopping now</p>
      </div>
    );
  }

  return (
    <PageTransitions>
      <div className="cart-page">
        <h1>Your Cart</h1>

        {cards.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>

              <div className="quantity">
                <FaMinus
                  style={{ opacity: item.quantity === 1 ? 0.4 : 1 }}
                  onClick={() =>
                    item.quantity > 1 && dispatch(decreaseQty(item.id))
                  }
                />

                <span className="qty">{item.quantity}</span>

                <FaPlus onClick={() => dispatch(increaseQty(item.id))} />
              </div>
            </div>

            <div className="cart-actions">
              <p>${item.price * item.quantity}</p>
              <FaTrashAlt
                className="delete"
                onClick={() => dispatch(remove(item.id))}
              />
            </div>
          </div>
        ))}

        {/* ===== SUMMARY ===== */}
        <div className="cart-summary">
          <p>Discount: {discount}%</p>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset cart?")) {
                dispatch(resetCart());
              }
            }}
          >
            Reset Cart
          </button>
        </div>

        {/* ===== PROMO CODE ===== */}
        <div className="promo">
          <input
            type="text"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          <button onClick={handlePromo}>Apply</button>
        </div>
      </div>
    </PageTransitions>
  );
}

export default Cart;
