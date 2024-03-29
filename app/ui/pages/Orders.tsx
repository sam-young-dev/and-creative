'use client';
import { useEffect, useState } from 'react';
import { MagicLoginForm } from '../components/checkout-forms/magiclogin';
import { useAuth } from '../hooks/useAuth';
import { ServiceAPI } from '~/use-cases/service-api';
import { Price } from '../lib/pricing/pricing-component';
// import DefaultImage from '~/assets/defaultImage.svg';
import { useAppContext } from '../app-context/provider';
import { ClientOnly } from '@crystallize/reactjs-hooks';
// import DownloadIcon from '~/assets/downloadIcon.svg';

export default ({ isServerSideAuthenticated }: { isServerSideAuthenticated: boolean }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any | null>(null);
  const { state } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  let orderDate = (date: any) => {
    let newDate = new Date(date);
    return newDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        setOrders(
          await ServiceAPI({
            language: state.language,
            serviceApiUrl: state.serviceApiUrl,
          }).fetchOrders(),
        );
      } catch (exception) {
        console.log(exception);
      }

      setIsLoading(false)
    })();
  }, []);

  return (
    <div className="min-h-[100vh] container 2xl px-6 mx-auto w-full">
      <ClientOnly>
        {isAuthenticated && isServerSideAuthenticated ? (
          <>
            <h1 className="text-2xl font-semibold my-10">Your Orders</h1>
            <div>
              {isLoading && <p>...loading</p>}
              {!isLoading && !orders && <p>No orders yet</p>}
              {orders &&
                orders.map((order: any, index: number) => (
                  <div key={order.id} className="border-2 border-grey my-5">
                    <div className="w-full h-30 bg-[#F0F2F2] px-5 py-2 flex flex-wrap justify-between items-center">
                      <div className="order-item">
                        <span>Order placed</span>
                        <p className="text-grey6">{orderDate(order.createdAt)}</p>
                      </div>
                      <div className="order-item">
                        <span>Order ID</span>
                        <p className="text-grey6">{order.id}</p>
                      </div>
                      <div className="order-item">
                        <span>Total</span>
                        <p className="text-grey6">
                          <Price currencyCode={order.total.currency}>
                            {order.total.gross}
                          </Price>
                        </p>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                      {order.cart.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center order-item"
                        >
                          <div className="flex gap-3 items-center">
                            <img
                              src={item.imageUrl ? item.imageUrl : ''}
                              width="40px"
                              height="40px"
                              alt="product"
                            />
                            <p className="w-40">{item.name}</p>
                          </div>
                          <p className="w-20">{item.quantity}</p>
                          <p className="w-20 text-right">
                            {/* adding because orders aren't returning currency, will be fixed */}
                            <Price
                              currencyCode={
                                item.price.currency || state.currency.code || 'USD'
                              }
                            >
                              {item.price.gross}
                            </Price>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="bg-textBlack py-3 px-4 text-[#fff] rounded-sm flex align-center gap-3">
                        <a href={`/order/invoice/${order.id}.pdf`}>Download invoice</a>
                        <img
                          // src={`${DownloadIcon}`}
                          src=""
                          alt="Download icon"
                          width="18"
                          height="18"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="min-h-[70vh] items-center justify-center flex max-w-[500px] mx-auto">
            <div className="mx-auto items-center justify-center flex w-full ">
              <MagicLoginForm title="Login" onlyLogin actionTitle="Login" />
            </div>
          </div>
        )}
      </ClientOnly>
    </div>
  );
};
