import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect("/");
  }
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/logo_main.jpg"
            alt="tracetocker logo"
            width={140}
            height={32}
            className="h-8 w-auto rounded-3xl"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            dolorum nisi assumenda modi, vitae qui illum natus fuga corporis,
            distinctio quam quis impedit amet inventore minus eaque quibusdam.
            Omnis, dolore!
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">Lorem Ipsum</cite>
              <p className="max-md:text-xs text-gray-500">Retail Investor</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src={"/star_png.png"}
                  alt="star"
                  width={16}
                  height={16}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
