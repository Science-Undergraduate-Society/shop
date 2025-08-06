import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPlayCircle, // for YouTube
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faSpotify,
    faTiktok,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    const socialLinks = [
        {
            name: "Email",
            icon: faEnvelope,
            extra: styles.iconEmail,
            link: "mailto:<EMAIL>",
        },
        {
            name: "Facebook",
            icon: faFacebook,
            link: "https://www.facebook.com/susubc/",
        },
        {
            name: "Instagram",
            icon: faInstagram,
            link: "https://www.instagram.com/susubc",
        },
        {
            name: "Linkedin",
            icon: faLinkedin,
            link: "https://www.linkedin.com/company/susubc/posts/?feedView=all",
        },
        {
            name: "Spotify",
            icon: faSpotify,
            link: "https://open.spotify.com/show/6LvV59dTsORiXSn4z28Zon?si=0708d6d527c145ce"
        },
        {
            name: "Tik tok",
            icon: faTiktok,
            link: "https://www.tiktok.com/@sus_ubc"
        },
        {
            name: "Youtube",
            icon: faYoutube,
            extra: styles.iconYoutube,
            link: "https://www.youtube.com/@scienceundergraduatesocietyubc"
        },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <img
                    className={styles.logo}
                    alt="SUS Logo"
                    src="/white-logo.png"
                />

                <div className={styles.socialContainer}>
                    {socialLinks.map(({ name, icon, extra, link }, idx) => (
                        <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                        >
                            <FontAwesomeIcon className={`${styles.icon} ${extra || ""}`} icon={icon} size="2x" />
                        </a>
                    ))}
                </div>

                <p className={styles.copyright}>
                    Copyright © 2025 UBC Science Undergraduate Society
                </p>
            </div>
        </footer>
    );
};
