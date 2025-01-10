import Container from "@/components/Container";
import CTAButton from "@/components/CTAButton";

export default function ComingSoon() {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center size-full min-h-screen  ">
                <div className=" space-y-4">
                    <h1 className="text-6xl font-extralight  ">
                        Coming Soon
                    </h1>
                    <p>
                    We&apos;re not quite finished, more info soon
                    </p>
                    <div className="w-full justify-end flex border-t pt-4">
                        <CTAButton reverse={true} href="/">Home</CTAButton>

                    </div>
                </div>
            </div>
        </Container>
    )
}