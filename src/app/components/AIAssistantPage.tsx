import { useState, useRef, useEffect } from 'react';
import { Send, Lock, Bot, User, AlertTriangle, RefreshCw } from 'lucide-react';
import { useProgressContext } from '../context/ProgressContext';
import { useNavigate } from 'react-router';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// Simulated AI responses based on health topics
function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  // Emergency keywords
  const emergencyKeywords = ['pecho', 'infarto', 'no puedo respirar', 'desmayo', 'inconsciente', 'sangrado', 'emergencia', 'urgencia', '131'];
  if (emergencyKeywords.some(kw => msg.includes(kw))) {
    return '🚨 ATENCIÓN: Lo que describes puede ser una emergencia médica.\n\n⚡ Llama al 131 (SAMU) de inmediato o pide que te lleven a urgencias del HUAP.\n\n⚠️ No pierdas tiempo aquí — cada minuto es importante en una emergencia.\n\nEsta app NO reemplaza la atención de urgencias.';
  }

  // Greetings
  if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas') || msg.match(/^(hi|hey|saludos)/)) {
    return '¡Hola! Soy el Asistente de IA del programa "IA y Salud" del Hospital HUAP.\n\nPuedo ayudarte con información general sobre salud, especialmente sobre:\n• Hipertensión arterial (presión alta)\n• Diabetes tipo 2\n• Artritis\n• Salud cardiovascular\n• Depresión y bienestar mental\n\n⚠️ Recuerda: Soy una herramienta educativa. No soy médico y no puedo diagnosticarte ni recetarte. Para atención médica real, consulta a tu médico en el HUAP.\n\n¿En qué te puedo ayudar hoy?';
  }

  // Hypertension
  if (msg.includes('presion') || msg.includes('presión') || msg.includes('hipertension') || msg.includes('hipertensión')) {
    return '📋 Información sobre Hipertensión Arterial (Presión Alta)\n\n¿Qué es?\nLa hipertensión es cuando la presión sanguínea en tus arterias está constantemente sobre 140/90 mmHg. Es muy común en personas mayores de 60 años.\n\n¿Cómo controlarla?\n• Reducir la sal en la comida\n• Hacer ejercicio moderado (caminar 30 min al día)\n• Mantener un peso saludable\n• Tomar los medicamentos recetados por tu médico\n• Medir la presión regularmente\n\n⚠️ Aviso importante: Esta es información general. Tu médico del HUAP es quien debe indicarte el tratamiento específico para tu caso.\n\n¿Tienes alguna pregunta más específica sobre la presión alta?';
  }

  // Diabetes
  if (msg.includes('diabetes') || msg.includes('azucar') || msg.includes('azúcar') || msg.includes('glucosa') || msg.includes('insulina')) {
    return '📋 Información sobre Diabetes Tipo 2\n\n¿Qué es?\nLa diabetes tipo 2 ocurre cuando el cuerpo no puede usar bien la insulina (la hormona que controla el azúcar en la sangre). Es muy manejable con los cuidados correctos.\n\nCuidados generales:\n• Dieta baja en azúcares y carbohidratos refinados\n• Ejercicio regular (ayuda a que el cuerpo use mejor la glucosa)\n• Controlar el peso\n• Monitorear la glucosa según indicaciones\n• Tomar los medicamentos exactamente como los recetó tu médico\n\nExámenes importantes:\n• HbA1c (hemoglobina glicosilada): indica tu control de azúcar en los últimos 3 meses. Idealmente bajo 7%.\n\n⚠️ Aviso: Solo tu médico puede ajustar tu tratamiento de diabetes. No cambies medicamentos sin consultarlo.\n\n¿Quieres información sobre algún aspecto específico de la diabetes?';
  }

  // Arthritis
  if (msg.includes('artritis') || msg.includes('articulacion') || msg.includes('articulación') || msg.includes('rodilla') || msg.includes('cadera') || msg.includes('reumat')) {
    return '📋 Información sobre Artritis\n\n¿Qué es?\nLa artritis es la inflamación de las articulaciones (rodillas, caderas, manos). Es muy común en personas mayores. Hay varios tipos, siendo los más frecuentes la artrosis y la artritis reumatoide.\n\nActividades recomendadas generalmente:\n• Ejercicios en agua (piscina, hidrogimnasia)\n• Caminatas suaves en superficies planas\n• Estiramiento gentil\n• Evitar el reposo absoluto (el movimiento ayuda)\n\nLo que generalmente ayuda:\n• Mantener un peso saludable (menos carga en las articulaciones)\n• Aplicar calor o frío según lo que te recomiende tu médico\n• Usar calzado cómodo y con buen soporte\n\n⚠️ Importante: Los ejercicios específicos y los medicamentos deben ser indicados por tu médico o kinesiólogo según tu tipo de artritis.\n\n¿Tienes alguna duda específica?';
  }

  // Heart / cardiovascular
  if (msg.includes('corazon') || msg.includes('corazón') || msg.includes('cardiovascular') || msg.includes('cardiaco') || msg.includes('cardíaco') || msg.includes('colesterol') || msg.includes('arritmia')) {
    return '📋 Información sobre Salud Cardiovascular\n\n¿Qué incluye?\nEl corazón y los vasos sanguíneos trabajan juntos para llevar sangre a todo el cuerpo. Los problemas cardiovasculares incluyen hipertensión, insuficiencia cardíaca, arritmias y colesterol alto.\n\nHábitos que cuidan el corazón:\n• No fumar (o dejar de fumar)\n• Alimentación baja en grasas saturadas y sal\n• Ejercicio aeróbico moderado (caminar es excelente)\n• Controlar el estrés\n• Controlar la presión arterial y el colesterol\n\nColesterol:\n• Colesterol total ideal: bajo 200 mg/dL\n• Hay "colesterol bueno" (HDL) y "colesterol malo" (LDL)\n• La alimentación y el ejercicio influyen mucho\n\n⚠️ Si sientes dolor en el pecho, dificultad para respirar o latidos irregulares fuertes, ve a urgencias de inmediato.\n\n¿Qué aspecto de la salud del corazón te interesa saber más?';
  }

  // Depression / mental health
  if (msg.includes('depresion') || msg.includes('depresión') || msg.includes('triste') || msg.includes('tristeza') || msg.includes('ansiedad') || msg.includes('solo') || msg.includes('sola') || msg.includes('mental')) {
    return '💙 Información sobre Salud Mental y Depresión\n\nPrimero, es valiente que hables de esto.\n\nLa depresión en personas mayores es más común de lo que se cree, pero NO es normal ni inevitable. Tiene tratamiento efectivo.\n\nSeñales de depresión (no diagnóstico):\n• Tristeza persistente por más de 2 semanas\n• Pérdida de interés en actividades que antes disfrutabas\n• Problemas para dormir o dormir demasiado\n• Falta de energía\n• Dificultad para concentrarse\n\nQué puede ayudar generalmente:\n• Hablar con alguien de confianza\n• Mantener rutinas y actividad física\n• Conexión social con familia y amigos\n• Atención médica profesional (psicólogo o psiquiatra)\n\n⚠️ Por favor, habla con tu médico del HUAP si sientes tristeza persistente. No tienes que estar solo con esto.\n\n📞 Si estás en crisis emocional: Salud Responde 600 360 7777 (24 horas)';
  }

  // Medications
  if (msg.includes('medicamento') || msg.includes('medicamentos') || msg.includes('pastilla') || msg.includes('pastillas') || msg.includes('remedio') || msg.includes('remedios') || msg.includes('farmaco') || msg.includes('fármaco')) {
    return '💊 Información sobre Medicamentos\n\nRecuerda la regla más importante: nunca cambies, suspendas ni agregues medicamentos sin hablar primero con tu médico o farmacéutico.\n\nConsejos generales:\n• Toma los medicamentos siempre a la misma hora del día\n• Si se te olvidó una dosis, no tomes doble — consulta las instrucciones\n• Guárdalos en un lugar fresco, seco y fuera del alcance de niños\n• Lleva siempre una lista de tus medicamentos a las consultas\n• Consulta al farmacéutico si tienes dudas sobre cómo tomarlos\n\n⚠️ Aviso importante: No puedo decirte qué medicamentos tomar ni en qué dosis. Eso es responsabilidad exclusiva de tu médico, quien conoce tu historial completo.\n\n¿Tienes alguna pregunta general sobre medicamentos?';
  }

  // Food / nutrition
  if (msg.includes('alimento') || msg.includes('comer') || msg.includes('comida') || msg.includes('dieta') || msg.includes('nutricion') || msg.includes('nutrición') || msg.includes('sal') || msg.includes('frutas') || msg.includes('verduras')) {
    return '🥗 Alimentación Saludable para Personas Mayores\n\nAlimentos recomendados generalmente:\n• Frutas y verduras variadas (idealmente 5 porciones al día)\n• Legumbres (lentejas, porotos, garbanzos)\n• Pescado 2-3 veces por semana\n• Lácteos descremados (calcio para los huesos)\n• Aceite de oliva en pequeñas cantidades\n• Agua (hidratarse bien es fundamental)\n\nLimitar o evitar:\n• Sal (máximo 5 gramos al día)\n• Azúcar y dulces\n• Frituras y grasas saturadas\n• Embutidos y carnes procesadas\n• Bebidas azucaradas\n\n⚠️ Si tienes diabetes, hipertensión u otra condición, tu médico o nutricionista puede darte una dieta específica para tu situación.\n\n¿Quieres información sobre algún alimento específico?';
  }

  // Exercise
  if (msg.includes('ejercicio') || msg.includes('actividad fisica') || msg.includes('caminar') || msg.includes('deporte') || msg.includes('moverse') || msg.includes('sedentario')) {
    return '🏃 Actividad Física para Personas Mayores\n\nLa OMS recomienda para adultos mayores:\n• Al menos 150 minutos de actividad moderada por semana\n• Ejercicios de equilibrio para prevenir caídas (3 días por semana)\n• Actividades de fortalecimiento muscular (2 días por semana)\n\nEjercicio ideal y de bajo impacto:\n• Caminata (¡el mejor ejercicio!)\n• Natación o hidrogimnasia\n• Yoga o taichi\n• Bicicleta estacionaria\n• Baile suave\n\nConsejos de seguridad:\n• Empieza gradualmente si no estás activo\n• Hidratarte bien antes, durante y después\n• Usa calzado cómodo y antideslizante\n• Evita ejercicio en el calor del mediodía\n\n⚠️ Antes de comenzar un programa de ejercicio, consulta a tu médico, especialmente si tienes problemas cardíacos o de presión.\n\n¿Tienes alguna condición específica sobre la que quieras más información?';
  }

  // Sleep
  if (msg.includes('dormir') || msg.includes('sueño') || msg.includes('insomnio') || msg.includes('descansar')) {
    return '😴 Problemas para Dormir\n\nEs común que las personas mayores tengan cambios en el sueño. Algunos consejos generales:\n\nHábitos que mejoran el sueño:\n• Mantener un horario regular (acostarse y levantarse a la misma hora)\n• Evitar el café, té y bebidas azucaradas después de las 3 pm\n• Habitación oscura, fresca y tranquila\n• Evitar siestas largas (máximo 30 minutos)\n• Hacer algo tranquilo antes de dormir (no teléfono ni TV)\n• Caminar o hacer ejercicio durante el día\n\nCuándo consultar al médico:\n• Ronquidos muy fuertes\n• Sensación de ahogo al dormir\n• Insomnio grave por más de 4 semanas\n• Somnolencia excesiva durante el día\n\n⚠️ No tomes somníferos sin receta médica. Muchos son peligrosos para personas mayores.\n\n¿Cuánto tiempo llevas con problemas para dormir?';
  }

  // Asking for diagnosis or prescription
  if (msg.includes('que tengo') || msg.includes('diagnóstico') || msg.includes('diagnostico') || msg.includes('recetar') || msg.includes('qué medicamento') || msg.includes('que medicamento') || msg.includes('debo tomar')) {
    return '⚠️ Lo que me preguntas requiere atención médica\n\nEsta es una de las cosas importantes que aprendiste en los módulos: yo no puedo diagnosticarte ni recetarte medicamentos.\n\n¿Por qué?\n• No conozco tu historial médico completo\n• No puedo examinarte físicamente\n• Un diagnóstico requiere exámenes reales\n\nLo que sí puedo hacer:\n• Explicarte qué es una enfermedad en palabras simples\n• Ayudarte a preparar preguntas para tu médico\n• Darte información general sobre síntomas o condiciones\n\n¿Quieres que te ayude a preparar preguntas para tu próxima consulta médica en el HUAP?';
  }

  // How to use this assistant
  if (msg.includes('cómo') || msg.includes('como usar') || msg.includes('qué puedo') || msg.includes('para qué')) {
    return '🤖 ¿Cómo puedo ayudarte?\n\nSoy el Asistente de IA del programa "IA y Salud" del HUAP. Aquí te explico qué puedo y no puedo hacer:\n\n✅ Puedo:\n• Explicar enfermedades en palabras simples\n• Dar información sobre hábitos saludables\n• Ayudarte a preparar preguntas para tu médico\n• Responder dudas sobre diabetes, presión, artritis, corazón y salud mental\n\n❌ No puedo:\n• Diagnosticarte\n• Recetarte medicamentos\n• Reemplazar a tu médico\n• Darte información personalizada (no conozco tu historial)\n\nAlgunos ejemplos de preguntas que puedes hacerme:\n• "¿Qué es la hipertensión arterial?"\n• "¿Qué alimentos debo evitar si tengo diabetes?"\n• "¿Qué preguntas le hago al cardiólogo?"\n\n¿Sobre qué tema quieres información hoy?';
  }

  // Preparing medical consultation
  if (msg.includes('consulta') || msg.includes('médico') || msg.includes('medico') || msg.includes('preguntas para') || msg.includes('cardiologo') || msg.includes('cardiólogo') || msg.includes('especialista')) {
    return '📝 Preparar tu Consulta Médica\n\nEstá muy bien que quieras prepararte antes de tu consulta. Aquí te doy una guía:\n\nAntes de ir al médico, anota:\n1. Tus síntomas principales: ¿qué sientes?, ¿desde cuándo?, ¿qué lo agrava?\n2. Medicamentos que tomas actualmente (nombre y dosis)\n3. Preguntas específicas que quieres hacer\n\nPreguntas útiles para llevar a cualquier consulta:\n• "¿Por qué tengo este síntoma?"\n• "¿Qué exámenes necesito hacerme?"\n• "¿Debo cambiar mi medicamento o dosis?"\n• "¿Qué señales debo vigilar?"\n• "¿Cuándo debo volver a consultar?"\n\n¿Me dices qué especialista vas a ver? Puedo ayudarte con preguntas más específicas para esa consulta (cardiólogo, diabetólogo, traumatólogo, etc.)';
  }

  // Privacy question
  if (msg.includes('privacidad') || msg.includes('datos') || msg.includes('rut') || msg.includes('seguro') || msg.includes('confidencial')) {
    return '🔒 Tu Privacidad con esta IA\n\nComo aprendiste en los módulos, aquí va un recordatorio importante:\n\n✅ Puedes decirme:\n• Síntomas generales sin tu nombre\n• Preguntas sobre enfermedades\n• Tu edad aproximada (no exacta si no quieres)\n\n❌ No me digas nunca:\n• Tu RUT o número de identidad\n• Tu dirección o teléfono\n• Tu número de Fonasa o Isapre\n• Datos bancarios o contraseñas\n\nEsta aplicación fue diseñada para proteger tu privacidad. Nuestro asistente no almacena conversaciones personales identificables.\n\n¿Tienes alguna pregunta sobre salud en la que pueda ayudarte?';
  }

  // Default response
  return `Gracias por tu pregunta. Déjame ayudarte de la mejor manera posible.\n\nPuedo darte información general sobre:\n🫀 Hipertensión (presión alta)\n🍬 Diabetes tipo 2\n🦴 Artritis\n❤️ Salud cardiovascular\n💙 Salud mental (depresión)\n🥗 Alimentación saludable\n🏃 Ejercicio y actividad física\n💊 Medicamentos (información general)\n\n¿Puedes contarme un poco más sobre qué quieres saber? Mientras más específica sea tu pregunta, mejor te puedo ayudar.\n\n⚠️ Recuerda: Para síntomas que te preocupen, lo mejor siempre es consultar a tu médico del HUAP.`;
}

const SUGGESTED_QUESTIONS = [
  '¿Qué es la hipertensión arterial?',
  '¿Qué alimentos son buenos para la diabetes?',
  '¿Cómo puedo preparar mi consulta con el cardiólogo?',
  '¿Qué ejercicios son seguros para la artritis?',
  '¿Qué debo evitar si tengo presión alta?',
  '¿Cuándo debo ir a urgencias y no a la IA?',
];

export function AIAssistantPage() {
  const { progress } = useProgressContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: '¡Hola! Soy tu Asistente de IA del HUAP.\n\nPuedo ayudarte con información general sobre tu salud. Recuerda que no soy médico y no puedo diagnosticarte, pero puedo orientarte y ayudarte a preparar tus consultas.\n\n¿En qué te puedo ayudar hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isLocked = !progress.module1QuizPassed;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome-reset',
      role: 'assistant',
      text: '¡Hola de nuevo! ¿En qué puedo ayudarte?',
      timestamp: new Date()
    }]);
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-10">
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 90, height: 90, backgroundColor: 'var(--color-azul-light)', border: '3px solid var(--color-azul)' }}
        >
          <Lock size={40} style={{ color: 'var(--color-azul)' }} />
        </div>
        <h1 style={{ color: 'var(--color-azul)', fontSize: '1.4rem', margin: 0 }}>
          Asistente de IA
        </h1>
        <div
          className="rounded-xl p-5 border-l-4 text-left"
          style={{ backgroundColor: 'var(--color-warning-bg)', borderLeftColor: 'var(--color-warning)' }}
        >
          <p style={{ fontWeight: 700, color: 'var(--color-warning)', margin: '0 0 8px' }}>
            🔒 Necesitas completar el Módulo 1 primero
          </p>
          <p style={{ margin: 0 }}>
            Para usar el Asistente de IA de forma segura, primero debes completar y aprobar el{' '}
            <strong>Módulo 1: Conocer la Inteligencia Artificial</strong>.
          </p>
          <p style={{ margin: '8px 0 0' }}>
            Esto es para asegurarnos de que entiendes cómo usar la IA responsablemente y proteger tu privacidad.
          </p>
        </div>
        <button
          onClick={() => navigate('/modulo/1')}
          className="px-8 py-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Ir al Módulo 1 →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
      {/* Header */}
      <div
        className="rounded-2xl p-4 text-white"
        style={{ background: 'linear-gradient(135deg, #6B3A8C, #4a2766)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Bot size={28} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold" style={{ margin: 0, fontSize: '1.1rem' }}>
              Asistente de IA · HUAP
            </p>
            <p className="text-white/80" style={{ margin: 0, fontSize: '0.8rem' }}>
              Módulo 3 — Para orientación en salud
            </p>
          </div>
          <button
            onClick={clearChat}
            className="ml-auto rounded-lg p-2 hover:bg-white/20 transition-colors"
            title="Nueva conversación"
            aria-label="Nueva conversación"
            style={{ minHeight: 44, minWidth: 44 }}
          >
            <RefreshCw size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-xl p-3 border-l-4 flex items-start gap-2"
        style={{ backgroundColor: 'var(--color-warning-bg)', borderLeftColor: 'var(--color-warning)' }}
        role="note"
      >
        <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: '0.8rem' }}>
          <strong>Esta IA no reemplaza a un médico.</strong> No puede diagnosticar ni recetar. Para emergencias, llama al <strong>131</strong>.
        </p>
      </div>

      {/* Messages */}
      <div
        className="flex flex-col gap-3 overflow-y-auto rounded-2xl p-4 border"
        style={{
          minHeight: 300,
          maxHeight: 450,
          backgroundColor: '#f8f8f6',
          borderColor: 'var(--color-border)'
        }}
        role="log"
        aria-live="polite"
        aria-label="Conversación con el asistente"
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 36,
                height: 36,
                backgroundColor: msg.role === 'user' ? 'var(--color-azul)' : '#6B3A8C',
                alignSelf: 'flex-end'
              }}
            >
              {msg.role === 'user'
                ? <User size={18} className="text-white" />
                : <Bot size={18} className="text-white" />
              }
            </div>

            {/* Bubble */}
            <div
              className="rounded-2xl px-4 py-3 max-w-[80%]"
              style={{
                backgroundColor: msg.role === 'user' ? 'var(--color-azul)' : 'white',
                color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.role === 'user' ? 16 : 4,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <p style={{
                margin: 0,
                whiteSpace: 'pre-line',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: msg.role === 'user' ? 'white' : 'var(--color-text)'
              }}>
                {msg.text}
              </p>
              <p style={{
                margin: '4px 0 0',
                fontSize: '0.7rem',
                opacity: 0.7,
                textAlign: msg.role === 'user' ? 'right' : 'left',
                color: msg.role === 'user' ? 'white' : 'var(--color-muted)'
              }}>
                {msg.timestamp.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 36, height: 36, backgroundColor: '#6B3A8C', alignSelf: 'flex-end' }}
            >
              <Bot size={18} className="text-white" />
            </div>
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-1"
              style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: '#6B3A8C',
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    opacity: 0.7
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && !isTyping && (
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: '0 0 8px' }}>
            Puedes preguntar por ejemplo:
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="px-3 py-2 rounded-lg border text-left hover:bg-gray-50 transition-colors"
                style={{
                  fontSize: '0.8rem',
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'white',
                  color: 'var(--color-azul)',
                  minHeight: 44
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta aquí..."
          rows={2}
          className="flex-1 rounded-xl border px-4 py-3 resize-none focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'white',
            fontSize: '1rem',
            minHeight: 60,
            '--tw-ring-color': 'var(--color-azul)',
          } as React.CSSProperties}
          aria-label="Escribe tu pregunta"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="rounded-xl text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-40"
          style={{
            backgroundColor: 'var(--color-azul)',
            minWidth: 56,
            minHeight: 60
          }}
          aria-label="Enviar mensaje"
        >
          <Send size={22} />
        </button>
      </form>

      {/* Keyboard hint */}
      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'center', margin: '-8px 0' }}>
        Presiona Enter para enviar • Shift+Enter para nueva línea
      </p>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
