import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { QueryImage, Header } from 'components/elements'
import { SectionContainer, Container, Flex } from 'components/containers'
import device, { size } from 'themes/device'
import { isBrowser } from 'common/utility'

const query = graphql`
    {
        marketing_2: file(relativePath: { eq: "careers-2/marketing-2.png" }) {
            ...fadeIn
        }
        marketing_2_mobile: file(relativePath: { eq: "careers-2/marketing-2-mobile.png" }) {
            ...fadeIn
        }
        recruitment_2: file(relativePath: { eq: "careers-2/recruitment-2.png" }) {
            ...fadeIn
        }
        recruitment_2_mobile: file(relativePath: { eq: "careers-2/recruitment-2-mobile.png" }) {
            ...fadeIn
        }
        accounts_2: file(relativePath: { eq: "careers-2/accounts-2.png" }) {
            ...fadeIn
        }
        accounts_2_mobile: file(relativePath: { eq: "careers-2/accounts-2-mobile.png" }) {
            ...fadeIn
        }
        payments_2: file(relativePath: { eq: "careers-2/payments-2.png" }) {
            ...fadeIn
        }
        payments_2_mobile: file(relativePath: { eq: "careers-2/payments-2-mobile.png" }) {
            ...fadeIn
        }
        tech_2: file(relativePath: { eq: "careers-2/tech-2.png" }) {
            ...fadeIn
        }
        tech_2_mobile: file(relativePath: { eq: "careers-2/tech-2-mobile.png" }) {
            ...fadeIn
        }
        product_2: file(relativePath: { eq: "careers-2/product-2.png" }) {
            ...fadeIn
        }
        product_2_mobile: file(relativePath: { eq: "careers-2/product-2-mobile.png" }) {
            ...fadeIn
        }
        operations_2: file(relativePath: { eq: "careers-2/operations-2.png" }) {
            ...fadeIn
        }
        operations_2_mobile: file(relativePath: { eq: "careers-2/operations-2-mobile.png" }) {
            ...fadeIn
        }
        cs_2: file(relativePath: { eq: "careers-2/cs-2.png" }) {
            ...fadeIn
        }
        cs_2_mobile: file(relativePath: { eq: "careers-2/cs-2-mobile.png" }) {
            ...fadeIn
        }
        compliance_2: file(relativePath: { eq: "careers-2/compliance-2.png" }) {
            ...fadeIn
        }
        compliance_2_mobile: file(relativePath: { eq: "careers-2/compliance-2-mobile.png" }) {
            ...fadeIn
        }
    }
`

const Description = styled(Flex)`
    padding: 32px;

    @media ${device.tablet} {
        margin-left: unset;
        margin-top: 20px;
        padding: 0 11.5px 24px;
    }
`

const ReviewCard = styled(Flex)`
    border-radius: 8px;
`

const TextWrapper = styled.div`
    max-width: 696px;
`

const StyledQueryImage = styled(QueryImage)`
    @media ${device.tablet} {
        max-width: 339px;
    }
`

const StaffReview = (review_data) => {
    const [is_mobile, setMobile] = useState(false)

    const handleResizeWindow = useCallback(() => {
        setMobile(isBrowser() ? window.screen.width <= size.tablet : false)
    }, [setMobile])

    useEffect(() => {
        handleResizeWindow()
        window.addEventListener('resize', handleResizeWindow)

        return () => {
            window.removeEventListener('resize', handleResizeWindow)
        }
    }, [handleResizeWindow])

    const data = useStaticQuery(query)
    return (
        <SectionContainer>
            <Container>
                <ReviewCard
                    fd="row"
                    ai="center"
                    tablet_direction="column"
                    bg="var(--color-grey-40)"
                >
                    <Flex jc="left" tablet_direction="column" tablet_ai="center">
                        <StyledQueryImage
                            b_radius="8px 0 0 8px"
                            data={
                                is_mobile
                                    ? data[review_data.data.image_mobile]
                                    : data[review_data.data.image]
                            }
                        />
                    </Flex>
                    <Description fd="column" jc="right" tablet_jc="center">
                        <TextWrapper>
                            <Header mb="16px" type="subtitle-1" as="p">
                                {review_data.data.testimony_headline}
                            </Header>
                            {review_data.data.paragraph?.map((data, idx) => {
                                return (
                                    <Header
                                        key={idx}
                                        mb="16px"
                                        type="paragraph-1"
                                        as="p"
                                        weight="400"
                                    >
                                        {data.text}
                                    </Header>
                                )
                            })}
                        </TextWrapper>
                    </Description>
                </ReviewCard>
            </Container>
        </SectionContainer>
    )
}

export default StaffReview
