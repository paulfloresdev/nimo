import React, { useEffect } from 'react';
import { SideBarProps } from '../../interfaces/layoutInterfaces';
import SideBarOption from './SidebarOption';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from '@heroui/react';
import DynamicFaIcon from '../DynamicFaIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../backend/store/config/store';
import { logoutRequest, meRequest } from '../../backend/store/features/auth/authSlice';
import { useNavigate } from 'react-router';

const SideBar: React.FC<SideBarProps> = ({ page }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(meRequest());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutRequest())
        navigate('/login');
    }

    return (
        <aside
            className={`
                flex flex-col bg-neutral-100 border-r
                transition-all duration-300 ease-in-out
                hidden lg:flex py-6
                h-screen overflow-hidden
                max-w-72
            `}
        >
            <nav className="flex flex-col px-3 h-full overflow-hidden">
                {/* Logo */}
                <div className="w-full flex justify-center mb-4 shrink-0">
                    <img src="/assets/favicon.png" alt="Logo" className="w-14" />
                </div>

                {/* Menu options with scroll */}
                <div className="flex-1 overflow-y-auto pr-1">
                    <ul className="space-y-2">
                        <SideBarOption
                            page={page}
                            index={0}
                            label='Inicio'
                            icon='FaHome'
                            href='/dashboard/'
                        />
                        <SideBarOption
                            page={page}
                            index={1}
                            label='Presupuestos mensuales'
                            icon='FaClipboardList'
                            href='/dashboard/months'
                        />
                        <SideBarOption
                            page={page}
                            index={2}
                            label='Movimientos'
                            icon='FaExchangeAlt'
                            href='/'
                        />
                        <SideBarOption
                            page={page}
                            index={3}
                            label='Cuentas y tarjetas'
                            icon='FaMoneyCheckAlt'
                            href='/'
                        />
                        <SideBarOption
                            page={page}
                            index={4}
                            label='Contactos'
                            icon='FaUserFriends'
                            href='/'
                        />
                    </ul>
                </div>

                {/* User profile or skeleton */}
                <div className="shrink-0 mt-4">
                    {loading ? (
                        <div>
                            <Divider className='mb-4' />
                            <div className="w-full h-10 flex flex-row items-center justify-start space-x-1 px-3">
                                <Skeleton className="rounded-full">
                                    <div className="h-10 w-12" />
                                </Skeleton>
                                <DynamicFaIcon name="FaAngleUp" className="text-gray-400 ml-auto" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Divider className='mb-4' />
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="light"
                                        className="w-full h-10 flex flex-row items-center justify-start space-x-1"
                                    >
                                        <div className="bg-neutral-200 w-12 h-10 rounded-full flex justify-center items-center border border-neutral-300">
                                            <span className="font-semibold text-base text-neutral-950">
                                                {
                                                    `${user?.name[0].toUpperCase()}${user?.lastname[0].toUpperCase()}`
                                                }
                                            </span>
                                        </div>

                                        <DynamicFaIcon name="FaAngleUp" className="text-gray-400 ml-auto" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="edit">Editar datos de usuario</DropdownItem>
                                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleLogout}>
                                        Cerrar sesión
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
};

export default SideBar;
