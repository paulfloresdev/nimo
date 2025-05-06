import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../backend/store/config/store';
import { loginRequest } from '../../backend/store/features/auth/authSlice';
import { Button, Form, Input } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);
    const user = useSelector((state: RootState) => state.auth.user); // Asegúrate de tener esto en tu estado

    // Redirección al dashboard si el login fue exitoso
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginRequest({ email, password }));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 px-4">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-xl bg-white border-r">
                {/* Imagen */}
                <div className="w-full lg:w-1/2 h-64 lg:h-auto">
                    <img
                        src="https://images.pexels.com/photos/6964335/pexels-photo-6964335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Formulario */}
                <div className="w-full lg:w-1/2 px-8 py-12 space-y-6 text-neutral-800 dark:text-white">
                    <div className="flex justify-center">
                        <img src="/assets/favicon.png" alt="Logo" className="w-20" />
                    </div>
                    <h1 className="text-xl font-semibold text-center">Inicio de Sesión</h1>
                    <Form onSubmit={handleSubmit} className="flex flex-col space-y-8">
                        <Input
                            isRequired
                            label="Correo electrónico"
                            placeholder="usuario@ejemplo.com"
                            type="email"
                            labelPlacement='outside'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='w-full flex flex-col items-end space-y-4'>
                            <Input
                                isRequired
                                label="Contraseña"
                                placeholder="••••••••"
                                type={passwordVisible ? 'text' : 'password'}
                                labelPlacement='outside'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endContent={
                                    <button
                                        type='button'
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className='font-semibold text-xs'
                                    >
                                        {passwordVisible ? 'OCULTAR' : 'MOSTRAR'}
                                    </button>
                                }
                            />
                            <a href="#" className='text-sm underline font-semibold'>¿Olvidaste tu contraseña?</a>
                        </div>
                        <Button
                            type="submit"
                            variant="solid"
                            color='primary'
                            radius='full'
                            className="w-full"
                            isLoading={loading}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>
                        <div className='w-full flex flex-col items-center space-y-4'>
                            <span className='text-sm'>
                                ¿No estás registrado? <a href="#" className='underline font-semibold'>Registrate aquí</a>
                            </span>  
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
