import { Row } from "antd";
import React from "react";
import { TitleSmall } from "../components/checkout-1.5.4/forms/Title";
import { useTranslation } from "../components/IntlContext/IntlContext";
import SectionMain from "../layout/SectionMain";
import toCurrency from "./toCurrency";

const RenderAmount = (plan, coupon = {}) => {
    const t = useTranslation()

    const renderBillingDateMessage = (billing_day, amount, currency, frequency) => {
        if (!billing_day) return (
            t(
                "^messages.trial_interval.discount",
                toCurrency(
                    amount,
                    currency
                ),
                t.frequency_interval_unit[
                frequency
                ]
            )
        )

        let date = new Date().toLocaleDateString()

        let [billingDay, billingMonth, billingYear] = date.split('/')

        billingDay = billing_day
        billingMonth = parseInt(billingMonth)
        billingYear = parseInt(billingYear)


        let today = date.split('/')[0]

        if (parseInt(today) >= billingDay) {
            ++billingMonth
            if (billingMonth > 12) {
                billingMonth = 1
                ++billingYear
            }
        }

        const billingDate = `${("0" + billingDay).slice(-2)}/${("0" + billingMonth).slice(-2)}/${billingYear}`

        return t(`@@ A partir do dia ${billing_day} do próximo mês, será cobrado ${toCurrency(amount, currency)}/${t.frequency_interval_unit[frequency]}`)
    }

    return (
        <>
            {coupon && coupon.discount_amount > 0
                ? <>
                    {plan?.trial.interval > 0
                        ? `${plan.trial.amount > 0
                            ? `${toCurrency(
                                plan.trial.amount,
                                plan.currency
                            )} ${t(
                                "^titles.trial",
                                `${plan.trial.interval
                                } ${plan.trial.interval !==
                                    1
                                    ? t.frequency_quantity[plan.trial.interval_unit]
                                    : t.frequency_interval_unit[plan.trial.interval_unit]
                                }`
                            )}`
                            : t(
                                "^titles.gratuitous",
                                `${plan.trial.interval
                                } ${plan.trial.interval !==
                                    1
                                    ? t.frequency_quantity[plan.trial.interval_unit]
                                    : t.frequency_interval_unit[plan.trial.interval_unit]
                                }`
                            )
                        }.`
                        : plan.charge_only_setup ?
                            `${toCurrency(
                                0,
                                plan.currency
                            )}`
                            : plan.amount === 0
                                ? ""
                                : `${toCurrency(
                                    coupon.total_amount,
                                    plan.currency
                                )}
                        ${plan.recurrence.count !== 1
                                    ? t.frequency[plan.recurrence.frequency]
                                    : ""
                                }`}
                    {plan.trial.interval > 0 && (
                        <SectionMain position="flex-end" noPadding>
                            <TitleSmall align="right">
                                {t(
                                    "^messages.trial_interval.discount",
                                    toCurrency(
                                        coupon.total_amount,
                                        plan.currency
                                    ),
                                    t.frequency_interval_unit[
                                    plan.recurrence.frequency
                                    ]
                                )}
                            </TitleSmall>
                        </SectionMain>
                    )}
                    {/* {plan.charge_only_setup && (
                        <SectionMain position="flex-end" noPadding>
                            <TitleSmall align="right">
                                {renderBillingDateMessage(plan.recurrence.billing_day, coupon.total_amount, plan.currency, plan.recurrence.frequency)}
                            </TitleSmall>
                        </SectionMain>
                    )} */}
                </>
                : <>
                    {plan?.trial.interval > 0
                        ? `${plan.trial.amount > 0
                            ? `${toCurrency(
                                plan.trial.amount,
                                plan.currency
                            )} ${t(
                                "^titles.trial",
                                `${plan.trial.interval
                                } ${plan.trial.interval !==
                                    1
                                    ? t.frequency_quantity[plan.trial.interval_unit]
                                    : t.frequency_interval_unit[plan.trial.interval_unit]
                                }`
                            )}`
                            : t(
                                "^titles.gratuitous",
                                `${plan.trial.interval
                                } ${plan.trial.interval !==
                                    1
                                    ? t.frequency_quantity[plan.trial.interval_unit]
                                    : t.frequency_interval_unit[plan.trial.interval_unit]
                                }`
                            )
                        }.`
                        : plan.charge_only_setup ?
                            `${toCurrency(
                                0,
                                plan.currency
                            )}`
                            : plan.amount === 0
                                ? ""
                                : `${toCurrency(
                                    plan.amount,
                                    plan.currency
                                )}
                        ${plan.recurrence.count !== 1
                                    ? t.frequency[plan.recurrence.frequency]
                                    : ""
                                }`}
                    {/* {plan.trial.interval > 0 && (
                        <SectionMain position="flex-end" noPadding>
                            <TitleSmall align="right">
                                {t(
                                    "^messages.trial_interval.discount",
                                    toCurrency(
                                        plan.amount,
                                        plan.currency
                                    ),
                                    t.frequency_interval_unit[
                                    plan.recurrence.frequency
                                    ]
                                )}
                            </TitleSmall>
                        </SectionMain>
                    )} */}
                </>
            }

            {plan.charge_only_setup && (
                <SectionMain position="flex-end" noPadding>
                    <TitleSmall align="right">
                        {renderBillingDateMessage(plan.recurrence.billing_day, plan.amount, plan.currency, plan.recurrence.frequency)}
                    </TitleSmall>
                </SectionMain>
            )}
        </>
    )
}

export default RenderAmount