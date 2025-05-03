import React, { useEffect, useState } from 'react';
import { SideBarProps } from '../../interfaces/layoutInterfaces';
import SideBarOption from './SidebarOption';
import { Button, Divider, Skeleton } from '@heroui/react';
import { User } from '../../types/User';
import { me } from '../../api/authService';
import DynamicFaIcon from '../DynamicFaIcon';

const SideBar: React.FC<SideBarProps> = ({ page }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        me()
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.error('Error al obtener usuario:', err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <aside
            className={`
                flex flex-col bg-neutral-100 border-r
                transition-all duration-300 ease-in-out
                hidden md:flex py-6
                h-screen overflow-hidden
                max-w-72 min-w-72
            `}
        >
            <nav className="flex flex-col px-3 h-full overflow-hidden">
                {/* Logo */}
                <div className="w-full flex justify-center mb-4 shrink-0">
                    <img src="/assets/favicon.png" alt="Logo" className="w-16" />
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
                            <Divider className='mb-4'/>
                            <div className="w-full h-14 flex flex-row items-center justify-start space-x-2 px-3">
                                <Skeleton className="rounded-full">
                                    <div className="h-10 w-14" />
                                </Skeleton>
                                <div className='w-full flex flex-col justify-start items-start'>
                                    <Skeleton className="rounded-md mb-1">
                                        <div className="h-4 w-32" />
                                    </Skeleton>
                                    <Skeleton className="rounded-md">
                                        <div className="h-2 w-40" />
                                    </Skeleton>
                                </div>
                                <DynamicFaIcon name="FaAngleUp" className="text-gray-400 ml-auto" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Divider className='mb-4'/>
                            <Button
                                variant="light"
                                className="w-full h-14 flex flex-row items-center justify-between space-x-2"
                            >
                                <div className="bg-neutral-200 w-14 h-10 rounded-full flex justify-center items-center border border-neutral-300">
                                    <span className="font-semibold text-base text-neutral-950">
                                        PF
                                    </span>
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                    <span className="text-neutral-950 font-semibold">{`${user?.name} ${user?.lastname}`}</span>
                                    <span className="text-xs text-gray-700">{user?.email}</span>
                                </div>
                                <DynamicFaIcon name="FaAngleUp" className="text-gray-400 ml-auto" />
                            </Button>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
};

export default SideBar;
