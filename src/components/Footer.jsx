import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import Logo from '../assets/projexino.png'

// Define all styled components first

const FooterWrapper = styled.footer`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(43, 90, 158, 0.85));  /* Use the same background as Navbar */
  backdrop-filter: blur(10px);
  color: #ffffff;
  padding: 2.5rem 0 1rem;
  position: relative;
`;


const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const BrandText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h6`
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(to right, #d9764a, #de7527);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #d9764a;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  margin: 1rem 0;
`;

const ContactItem = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  
  i {
    color: #d9764a;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #d9764a, #de7527);
    transform: translateY(-2px);
    color: #ffffff;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const CopyrightText = styled.p`
  color: rgba(255, 255, 255, 0.6);
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const BottomLink = styled(Link)`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #d9764a;
  }
`;

// Add the missing NewsletterText component
const NewsletterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Footer = () => {
    const staggerAnimation = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fadeInUp = {
        initial: { y: 60, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Blog', path: '/blog' },
        { name: 'Industries', path: '/industries' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' }
    ];

    const serviceLinks = [
        { path: '/services/web-design', label: 'Web Design', icon: 'code' },
        { path: '/services/web-development', label: 'Web Development', icon: 'code' },
        { path: '/services/app-development', label: 'App Development', icon: 'mobile-alt' },
        { path: '/services/social-media', label: 'Social Media Marketing', icon: 'bullhorn' },
        { path: '/services/staffing', label: 'Staffing Services', icon: 'users' }
    ];

    return (
        <FooterWrapper>
            <FooterContainer>
                <motion.div
                    variants={staggerAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}

                >
                    <FooterGrid>
                        <motion.div variants={fadeInUp}>
                            <div className="flex items-center space-x-2 mb-4">
                                <img src={Logo} alt="Logo" className="h-20 w-auto" />
                            </div>
                            <BrandText>
                                Transforming ideas into digital reality. Your trusted partner for innovative solutions.
                            </BrandText>
                            <ContactInfo>
                                <ContactItem>
                                    <i className="fas fa-map-marker-alt"></i>
                                    Plot No: 305 Sa Society Khanamet, Kondapur
                                </ContactItem>
                                <ContactItem>
                                    <i className="fas fa-phone"></i>
                                    +91 9601843090
                                </ContactItem>
                            </ContactInfo>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <SectionTitle>QUICK LINKS</SectionTitle>
                            <FooterLinks>
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <StyledLink to={link.path}>
                                            <i className="fas fa-angle-right"></i> {link.name}
                                        </StyledLink>
                                    </li>
                                ))}
                            </FooterLinks>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <SectionTitle>SERVICES</SectionTitle>
                            <FooterLinks>
                                {serviceLinks.map((link, index) => (
                                    <li key={index}>
                                        <StyledLink to={link.path}>
                                            <i className={`fas fa-${link.icon}`}></i> {link.label}
                                        </StyledLink>
                                    </li>
                                ))}
                            </FooterLinks>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <SectionTitle>GET IN TOUCH</SectionTitle>
                            <NewsletterText>Stay updated with our latest news and offers</NewsletterText>
                            <SocialIcons>
                                <SocialLink href="https://www.facebook.com/profile.php?id=61570408020608" target="_blank">
                                    <FaFacebook size={20} />
                                </SocialLink>
                                <SocialLink href="#" target="_blank">
                                    <FaLinkedin size={20} />
                                </SocialLink>
                                <SocialLink href="https://www.instagram.com/projexinosolutionspvtltd" target="_blank">
                                    <FaInstagram size={20} />
                                </SocialLink>
                                <SocialLink href="https://www.youtube.com/@projexinosolutionspvtltd" target="_blank">
                                    <FaYoutube size={20} />
                                </SocialLink>
                            </SocialIcons>
                        </motion.div>
                    </FooterGrid>
                </motion.div>

                <BottomBar>
                    <CopyrightText>
                        © {new Date().getFullYear()} Projexino Solutions Pvt.Ltd. All rights reserved.
                    </CopyrightText>
                    <BottomLinks>
                        <BottomLink to="/privacy">Privacy</BottomLink>
                        <BottomLink to="/terms">Terms</BottomLink>
                        <BottomLink to="/cookies">Cookies</BottomLink>
                    </BottomLinks>
                </BottomBar>
            </FooterContainer>
        </FooterWrapper>
    );
};

export default Footer;
