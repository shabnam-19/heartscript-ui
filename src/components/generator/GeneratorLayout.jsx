function GeneratorLayout({ children }) {

    return (

        <section className="min-h-screen px-6 py-20">

            <div className="max-w-4xl mx-auto">

                {children}

            </div>

        </section>

    );

}

export default GeneratorLayout;