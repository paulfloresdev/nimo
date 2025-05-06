import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
 // Asegúrate de importar la acción correcta
import { User } from '../types/User';
import { meRequest } from '../backend/store/features/auth/authSlice';

// Definir el tipo para el estado de la aplicación
interface RootState {
    auth: {
        user: User | null;
        loading: boolean;
        error: string | null;
    };
}

const UserProfile: React.FC = () => {
    const dispatch = useDispatch();
    
    // Obtener los datos del usuario y el estado de carga desde Redux
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(meRequest());  // Dispara la acción para obtener los datos del usuario
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='bg-gray-100'>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default UserProfile;
