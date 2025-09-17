import React, { useState, useEffect } from 'react';
import { ExternalLink, Crown, Diamond, Gem, ArrowUp, Menu, X, Star, Users, Zap } from 'lucide-react';

const StickyNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-purple-500/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">GPTs Premium</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('autoconhecimento')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Autoconhecimento
            </button>
            <button 
              onClick={() => scrollToSection('produtividade')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Produtividade
            </button>
            <button 
              onClick={() => scrollToSection('decisoes')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Decisões
            </button>
            <button 
              onClick={() => scrollToSection('personalizado')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              GPT Personalizado
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-purple-500/20">
            <div className="flex flex-col space-y-4 p-4">
              <button 
                onClick={() => scrollToSection('autoconhecimento')}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-left font-medium py-2"
              >
                Autoconhecimento
              </button>
              <button 
                onClick={() => scrollToSection('produtividade')}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-left font-medium py-2"
              >
                Produtividade
              </button>
              <button 
                onClick={() => scrollToSection('decisoes')}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-left font-medium py-2"
              >
                Decisões
              </button>
              <button 
                onClick={() => scrollToSection('personalizado')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-left"
              >
                GPT Personalizado
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-40"
      onClick={scrollToTop}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

const LoadingButton = ({ children, href, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (href) {
        window.open(href, '_blank');
      }
    }, 1000);
  };

  return (
    <button
      className={`relative overflow-hidden transition-all duration-300 font-semibold ${className}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Abrindo...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

const GPTCard = ({ gpt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative overflow-hidden border-2 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 rounded-lg p-6 ${
        isHovered ? 'scale-105 shadow-2xl shadow-purple-500/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-purple-600/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
          GRÁTIS
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-4xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
            {gpt.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2">
              {gpt.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{gpt.users} usuários</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{gpt.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {gpt.description}
        </p>

        {isHovered && (
          <div className="space-y-3 mb-6 transition-all duration-500">
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <Zap className="w-4 h-4" />
              <span>Resposta instantânea</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <Diamond className="w-4 h-4" />
              <span>Interface intuitiva</span>
            </div>
          </div>
        )}

        <LoadingButton
          href={gpt.href}
          className="w-full border-2 border-purple-500 text-purple-400 hover:bg-purple-600 hover:border-purple-600 hover:text-white px-6 py-3 rounded-lg"
        >
          <ExternalLink className="w-4 h-4 mr-2 inline" />
          Usar GPT
        </LoadingButton>
      </div>
    </div>
  );
};

const LuxurySection = ({ category, title, description, icon, gpts, reverse = false }) => {
  return (
    <section id={category} className="py-20 lg:py-32 relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          
          <div className={`space-y-8 ${reverse ? 'lg:order-2' : ''}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl lg:text-6xl">{icon}</div>
                <div>
                  <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">{title}</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{gpts.length}</div>
                <div className="text-sm text-gray-400">GPTs Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-400">100%</div>
                <div className="text-sm text-gray-400">Gratuito</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">4.8★</div>
                <div className="text-sm text-gray-400">Avaliação Média</div>
              </div>
            </div>
          </div>

          <div className={`space-y-6 ${reverse ? 'lg:order-1' : ''}`}>
            {gpts.map((gpt, index) => (
              <GPTCard key={index} gpt={gpt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const autoconhecimentoGpts = [
    {
      icon: "🪞",
      name: "Espelho das Crenças",
      description: "Revela como suas crenças absolutas alimentam seus opostos (orgulho-submissão, força-fraqueza, controle-culpa). Metáforas claras e passos práticos para restaurar equilíbrio mental.",
      href: "https://chatgpt.com/g/g-68bfcef00cf88191b453e6aed8df70f2-espelho-das-crencas",
      users: "340+",
      rating: "4.7"
    },
    {
      icon: "✈️",
      name: "Destruindo o Piloto Automático",
      description: "Respirando, mas sem viver? O piloto automático é a rendição silenciosa. Aqui, você vai quebrar esse estado e reconquistar direção e autonomia.",
      href: "https://chatgpt.com/g/g-68c1c9617404819182b803353de36a98-destruindo-o-piloto-automatico",
      users: "520+",
      rating: "4.9"
    },
    {
      icon: "🔄",
      name: "Quebra Padrões",
      description: "Seu cérebro vive estagnado? Cria choques simples e imediatos para você romper a rotina e retomar o controle da sua mente.",
      href: "https://chatgpt.com/g/g-68c2d1d75e608191a1393ae4ad86af86-quebra-padroes",
      users: "280+",
      rating: "4.6"
    },
    {
      icon: "💪",
      name: "Quebra Timidez",
      description: "Supere a timidez com desafios sociais adaptados ao seu momento. De um sorriso leve a um choque social, sempre o passo certo para você.",
      href: "https://chatgpt.com/g/g-68c38a6d10e481919a279265fc0ed920-quebra-timidez",
      users: "430+",
      rating: "4.8"
    }
  ];

  const produtividadeGpts = [
    {
      icon: "🎯",
      name: "Prompt Max",
      description: "Especialista em criação de prompts para qualquer finalidade. Transforma instruções simples em prompts claros, detalhados e altamente eficazes para IA.",
      href: "https://chatgpt.com/g/g-683f3e4b8da48191bed757b47d27020d-prompt-max",
      users: "780+",
      rating: "4.9"
    },
    {
      icon: "📊",
      name: "Plano de Negócios Pro",
      description: "Construa seu Plano de Negócios passo a passo. Defina persona, analise o mercado e estruture todas as etapas sem depender de consultores externos.",
      href: "https://chatgpt.com/g/g-68c46be7da988191b7241b799d68c597-plano-de-negocios-pro",
      users: "620+",
      rating: "4.7"
    },
    {
      icon: "⚖️",
      name: "Avocado",
      description: "Estude Direito com inteligência. Transforma a CF/88, jurisprudência e grandes autores em respostas diretas e fáceis de memorizar. Perfeito para dúvidas, debates e provas.",
      href: "https://chatgpt.com/g/g-6821fa25c5d481919465a5e35bbee46b-avocado",
      users: "390+",
      rating: "4.8"
    }
  ];

  const decisoesGpts = [
    {
      icon: "🌌",
      name: "Jogue pro Universo",
      description: "Tá entre um sim e um não? A sorte pode estar do seu lado! Jogue para o universo e descubra qual caminho ele aponta pra você.",
      href: "https://chatgpt.com/g/g-68c174afba188191889a709aaea03872-jogue-pro-universo",
      users: "240+",
      rating: "4.5"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <StickyNavigation />
      <BackToTop />

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 lg:space-y-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Crown className="w-8 h-8 lg:w-12 lg:h-12 text-purple-400 animate-bounce" />
              <Crown className="w-12 h-12 lg:w-16 lg:h-16 text-purple-500 animate-pulse" />
              <Crown className="w-8 h-8 lg:w-12 lg:h-12 text-purple-400 animate-bounce" />
            </div>

            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-4xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-rose-200 bg-clip-text text-transparent leading-tight">
                Criador por demanda própria
              </h1>
              <p className="text-lg lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                Desenvolvi esses GPTs para facilitar minha vida. Alguns mais profundos foram desenvolvidos com método, estudos e experimentação.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-rose-600/20 border border-purple-500/30 rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
              <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-rose-400 bg-clip-text text-transparent">
                Se funciona na minha vida, pode funcionar na sua.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 pt-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400">8+</div>
                <div className="text-sm text-gray-400">GPTs Gratuitos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-rose-400">1000+</div>
                <div className="text-sm text-gray-400">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-amber-400">4.8★</div>
                <div className="text-sm text-gray-400">Avaliação Média</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <LuxurySection
        category="autoconhecimento"
        title="Autoconhecimento"
        description="Ferramentas práticas para quem quer se conhecer melhor e quebrar padrões limitantes. Desenvolva sua inteligência emocional e conquiste o equilíbrio mental."
        icon="🧠"
        gpts={autoconhecimentoGpts}
      />

      <LuxurySection
        category="produtividade"
        title="Produtividade"
        description="Ferramentas para otimizar seu trabalho, estudos e projetos empresariais. Maximize seus resultados com inteligência artificial aplicada."
        icon="⚡"
        gpts={produtividadeGpts}
        reverse={true}
      />

      <LuxurySection
        category="decisoes"
        title="Decisões"
        description="Para momentos de indecisão com um toque de sorte direcionada. Quando a lógica não basta, deixe o universo te guiar."
        icon="🎲"
        gpts={decisoesGpts}
      />

      {/* Custom GPT Section */}
      <section id="personalizado" className="py-20 lg:py-32 relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-rose-900/20 to-slate-800" />
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-6xl mx-auto bg-slate-800/50 border-2 border-rose-500/30 backdrop-blur-lg rounded-2xl p-8 lg:p-16">
            <div className="text-center space-y-12">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-rose-400">
                  Precisa de algo específico?
                </h2>
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl flex items-center justify-center">
                  <Diamond className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              
              <p className="text-xl lg:text-3xl text-gray-300 leading-relaxed font-light max-w-5xl mx-auto">
                Além dos GPTs gratuitos, também criamos ferramentas personalizadas para necessidades específicas do seu negócio ou projeto pessoal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
                <div className="bg-slate-700/50 border border-purple-500/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-purple-400 mb-2">Personalizado</h3>
                  <p className="text-sm lg:text-base text-gray-300">Desenvolvido especialmente para suas necessidades</p>
                </div>
                
                <div className="bg-slate-700/50 border border-rose-500/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Diamond className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-rose-400 mb-2">Premium</h3>
                  <p className="text-sm lg:text-base text-gray-300">Qualidade profissional e suporte dedicado</p>
                </div>
                
                <div className="bg-slate-700/50 border border-amber-500/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Gem className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-amber-400 mb-2">Exclusivo</h3>
                  <p className="text-sm lg:text-base text-gray-300">Solução única para seu caso específico</p>
                </div>
              </div>
              
              <LoadingButton 
                href="https://wa.me/5561981296529?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20GPT%20Personalizado."
                className="bg-[#44fd05] hover:bg-green-600 text-slate-900 px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-[#44fd05]/25" // Cor alterada para verde e hover ajustado
              >
                <ExternalLink className="w-6 h-6 lg:w-8 lg:h-8 mr-4 inline" />
                Solicitar GPT Personalizado
              </LoadingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 lg:py-20 bg-slate-800/50 border-t border-purple-500/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-24 lg:w-32 bg-gradient-to-r from-transparent to-purple-500" />
              <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 animate-pulse" />
              <div className="h-px w-24 lg:w-32 bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            
            <div className="space-y-4">
              <p className="text-lg lg:text-xl text-white font-semibold">
                © 2025 Celso Eduardo - Todos os direitos reservados
              </p>
              <p className="text-base lg:text-lg text-gray-400">
                GPTs disponíveis gratuitamente na loja oficial do ChatGPT
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-8">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-purple-500 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-rose-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-amber-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
