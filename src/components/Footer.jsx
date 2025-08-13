function Footer(){
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; 2025 Socks E-commerce. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="http://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Facebook</a>
                    <a href="http://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Facebook</a>
                    <a href="http://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Facebook</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;