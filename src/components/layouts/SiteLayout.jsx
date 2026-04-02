import { Link } from "react-router-dom";

export default function SiteLayout({ children }) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-white text-primary">
      {/* NAVBAR */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <span className="relative">
              EclesiaSoft
              <img
                src="src/assets/icon.png"
                className="absolute -top-2 -right-4 w-5 h-5"
              />
            </span>
          </Link>

          {/* MENU */}
          <div className="flex items-center gap-6">
            <Link
              to="/auth/signup"
              className="px-5 py-2 rounded-xl bg-primary text-white font-medium hover:bg-secondary transition"
            >
              Cadastrar
            </Link>
            <Link
              to="/auth/signin"
              className="px-5 py-2 rounded-xl bg-dark-2 text-white font-medium hover:bg-dark transition"
            >
              Entrar
            </Link>
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-secondary text-white py-12 mt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">

          <div>
            <h3 className="text-xl font-semibold mb-3">
              <span className="text-white">EclesiaSoft</span>
            </h3>
            <p className="text-sm text-gray-300">
              Gere orçamentos profissionais de forma rápida, prática e organizada.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-white">Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/auth/signin" className="hover:text-white">Login</Link></li>
              <li><a href="https://wa.me/5519971553715" className="hover:text-white">Suporte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-white">Contato</h4>
            <p className="text-gray-300">WhatsApp:</p>
            <a
              href="https://wa.me/5519971553715"
              className="text-white hover:text-dark-2"
            >
              (19) 97155-3715
            </a>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-400 text-sm">
          © {year} EclesiaSoft — Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
