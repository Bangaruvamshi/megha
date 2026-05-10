import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

const CartDrawer = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Customer";
  const userPhone = user?.user_metadata?.phone || user?.phone || "Not provided";
  const userEmail = user?.email || "Not provided";

  const productLines = items
    .map((i) => `• ${i.name} (${i.weight}) x${i.quantity}`)
    .join("\n");

  const whatsappMessage = `*New Order from Website*\n\n*Customer Details:*\nName: ${userName}\nEmail: ${userEmail}\nPhone: ${userPhone}\n\n*Order Items:*\n${productLines}\n\nPlease share pricing and confirm my order. Thank you!`;

  const whatsappUrl = `https://wa.me/917702869101?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Add some products to get started</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-muted/30 rounded-xl p-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.weight}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <button onClick={() => removeFromCart(item.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-border pt-4 space-y-3">
              {/* User details preview */}
              <div className="bg-muted/30 rounded-xl p-3 space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-heading font-semibold">Ordering as</p>
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl h-11 font-heading font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Checkout via WhatsApp
                </Button>
              </a>
              <button onClick={clearCart} className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors text-center py-1">
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
