import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import {
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineBanknotes,
  HiOutlineChartBarSquare,
  HiOutlineCreditCard,
  HiOutlineArrowTrendingUp,
} from 'react-icons/hi2';
import { TbArrowsExchange } from 'react-icons/tb';

const TUTORIAL_KEY = 'fiar_tutorial_completed';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  tip?: string;
}

const STEPS: TutorialStep[] = [
  {
    title: 'Bienvenido a Fiar',
    description: 'Fiar te permite llevar el control de los creditos que das a tus clientes de confianza. Sin intereses, sin complicaciones.',
    icon: <HiOutlineArrowTrendingUp size={48} />,
    tip: 'Este tutorial dura menos de 1 minuto.',
  },
  {
    title: '1. Registra tus clientes',
    description: 'Ve a la seccion de Clientes para agregar las personas a quienes les fias. Solo necesitas nombre y cedula.',
    icon: <HiOutlineUserGroup size={48} />,
    tip: 'Puedes agregar clientes desde cualquier pantalla usando el boton "Nuevo cliente".',
  },
  {
    title: '2. Presta o Abona',
    description: 'Cuando le prestas dinero a un cliente, registra un Prestamo. Cuando te paga, registra un Abono. Asi siempre sabras cuanto te deben.',
    icon: <HiOutlineBanknotes size={48} />,
    tip: 'Rojo = Prestamo (dinero que sale). Verde = Abono (dinero que entra).',
  },
  {
    title: '3. Revisa transacciones',
    description: 'En Transacciones ves todo el historial. Puedes filtrar por cliente, estado, fecha y exportar a Excel.',
    icon: <TbArrowsExchange size={48} />,
    tip: 'Usa el boton flotante amarillo para crear transacciones rapido.',
  },
  {
    title: '4. Tu Dashboard',
    description: 'El Dashboard te muestra un resumen completo: cuanto has prestado, cuanto te deben, clientes activos y mas.',
    icon: <HiOutlineChartBarSquare size={48} />,
    tip: 'Es tu centro de control. Revisalo diariamente.',
  },
  {
    title: '5. Mejora tu plan',
    description: 'El plan gratuito tiene limite de clientes. Si necesitas mas, ve a Planes y elige el que mejor se ajuste a tu negocio.',
    icon: <HiOutlineCreditCard size={48} />,
    tip: 'Puedes empezar gratis y escalar cuando lo necesites.',
  },
];

const Tutorial: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(TUTORIAL_KEY);
    if (!completed) {
      setVisible(true);
    }
  }, []);

  const handleSkip = useCallback(() => {
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setVisible(false);
  }, []);

  const handleNext = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      localStorage.setItem(TUTORIAL_KEY, 'true');
      setVisible(false);
    }
  }, [step]);

  const handlePrev = useCallback(() => {
    if (step > 0) setStep(s => s - 1);
  }, [step]);

  if (!visible) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      padding: '16px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        maxWidth: '460px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        animation: 'fadeInUp 0.3s ease',
      }}>
        {/* Progress bar */}
        <div style={{ height: 4, backgroundColor: '#e9ecef' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#FFC313',
            transition: 'width 0.3s ease',
            borderRadius: '0 2px 2px 0',
          }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px 0',
        }}>
          <span style={{ fontSize: '0.8rem', color: '#adb5bd', fontWeight: 600 }}>
            {step + 1} de {STEPS.length}
          </span>
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              color: '#6c757d',
              fontSize: '0.85rem',
              padding: '4px 8px',
              borderRadius: '6px',
            }}
          >
            <HiOutlineXMark size={16} />
            Saltar tutorial
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', textAlign: 'center' }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#FFF8E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#FFC313',
          }}>
            {current.icon}
          </div>
          <h4 style={{ fontWeight: 700, color: '#2c3e50', marginBottom: 12 }}>
            {current.title}
          </h4>
          <p style={{ color: '#6c757d', lineHeight: 1.6, marginBottom: 16, fontSize: '0.95rem' }}>
            {current.description}
          </p>
          {current.tip && (
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: '#495057',
              borderLeft: '3px solid #FFC313',
              textAlign: 'left',
            }}>
              <strong>Tip:</strong> {current.tip}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px 20px',
          gap: 12,
        }}>
          <Button
            variant="outline-secondary"
            onClick={handlePrev}
            disabled={step === 0}
            style={{ borderRadius: '8px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <HiOutlineArrowLeft size={16} /> Anterior
          </Button>
          <Button
            onClick={handleNext}
            style={{
              borderRadius: '8px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              backgroundColor: isLast ? '#198754' : '#FFC313',
              border: 'none',
              color: isLast ? '#fff' : '#111',
              fontWeight: 600,
            }}
          >
            {isLast ? (
              <><HiOutlineCheckCircle size={16} /> Empezar</>
            ) : (
              <>Siguiente <HiOutlineArrowRight size={16} /></>
            )}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Tutorial;

/** Utility: reset tutorial (call from settings or dev tools) */
export const resetTutorial = () => localStorage.removeItem(TUTORIAL_KEY);
