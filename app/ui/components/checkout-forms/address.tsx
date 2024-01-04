import { ChangeEvent, useState } from 'react';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { Input } from '../../components/input';
// import { useAuth } from '../../hooks/useAuth';
import { Customer } from '~/use-cases/contracts/Customer';

export const AddressForm: React.FC<{ title: string; onValidSubmit: Function }> = ({ title, onValidSubmit }) => {
    const [isReadonly, setToReadonly] = useState(false);
    // const { isAuthenticated, userInfos } = useAuth();
    const [customer] = useLocalStorage<Partial<Customer>>('customer', {
        // email: userInfos?.email,
        // firstname: userInfos?.firstname,
        // lastname: userInfos?.lastname,
        email: undefined,
        firstname: undefined,
        lastname: undefined
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        writeStorage('customer', {
            ...customer,
            [event.target.name]: event.target.value.trim(),
        });
    };

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl mt-5 mb-3">{title}</h1>
            {/* {isAuthenticated && (
                <p>
                    Hello, {userInfos?.firstname} {userInfos?.lastname} (<strong>{userInfos?.email}</strong>),
                </p>
            )} */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setToReadonly(true);
                    onValidSubmit();
                    return false;
                }}
            >
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        // defaultValue={customer.firstname || userInfos?.firstname}
                        defaultValue={customer.firstname}
                        placeholder={'Frodo'}
                        label={'First Name'}
                        name="firstname"
                        required
                        onChange={handleChange}
                        disabled={isReadonly}
                    />

                    <Input
                        // defaultValue={customer.lastname || userInfos?.lastname}
                        defaultValue={customer.lastname}
                        placeholder={'Baggins'}
                        label={'Last Name'}
                        name="lastname"
                        required
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                </div>
                <div className="mt-3">
                    <Input
                        // defaultValue={customer.email || userInfos?.email}
                        defaultValue={customer.email}
                        label={'Email'}
                        placeholder={'Frodo.ringmaster@shireclub.com'}
                        name="email"
                        required
                        type="email"
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                </div>
                <div className="mt-3">
                    <Input
                        defaultValue={customer.streetAddress}
                        label={'Street Address'}
                        placeholder={'6th hole from the Brandybuck Family'}
                        name="streetAddress"
                        required
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                    <Input
                        defaultValue={customer.country}
                        label={'Country'}
                        placeholder={'Middle Earth'}
                        name="country"
                        required
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                    <Input
                        defaultValue={customer.city}
                        label={'City'}
                        placeholder={'Shire'}
                        name="city"
                        required
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                    <Input
                        defaultValue={customer.zipCode}
                        label={'Zip Code'}
                        placeholder={'3130'}
                        name="zipCode"
                        required
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                </div>
                <div className="mt-3">
                    <Input
                        defaultValue={customer.additionalInfo}
                        label={'Additional Info'}
                        placeholder={'Anything we should keep in mind before dispatching your order?'}
                        name="additionalInfo"
                        onChange={handleChange}
                        disabled={isReadonly}
                    />
                </div>
                {/* {!isReadonly && (
                    <button
                        data-testid="checkout-next-step-button"
                        className="bg-black text-white rounded-md px-6 py-3 mt-5 float-right"
                        disabled={isReadonly}
                        type="submit"
                    >
                        {'Next'}
                    </button>
                )} */}
            </form>
        </div>
    );
};
