

export function AppLogo({ width = 80, height = "auto" }: AppLogoProps) {
    return (
        <img
            src="/images/logo.png"
            alt="LOGO"
            style={{ width, height }}
            className="object-contain"
        />
    )
}