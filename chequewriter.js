function numtowords(numlist){
    for (x in numlist){
        numlist[x]=parseInt(numlist[x])
    }
    str=""
    str+=hundreds[numlist[2]]
    if (!(numlist[1]==0 && numlist[0]==0) && numlist[2]!=0){
        str+=" and "
    }
    if (numlist[1]==1){
        str+=teens[numlist[0]]
    } else {
        str+=tens[numlist[1]]
        if (!(numlist[1]==0 || numlist[0]==0)){str+="-"}
        str+=ones[numlist[0]]
    }
    return str
}
function arraysequal(ar1,ar2){
    match=true
    for (x in ar1){
        if (ar1[x]!=ar2[x]){
            match=false
        }
    }
    return match;
    
}
ones=["","one","two","three","four","five","six","seven","eight","nine"]
tens=["","","twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"]
teens=["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"]
hundreds=["","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"]
function submitinfo(){
    sender=document.querySelector("#sender").value
    sender=sender.charAt(0).toUpperCase() + sender.slice(1)
    recipient=document.querySelector("#recipient").value
    recipient=recipient.charAt(0).toUpperCase() + recipient.slice(1)
    amount=parseInt(document.querySelector("#money").value)
    if (sender=="" || recipient=="" || amount=="" || amount==0){throw "empty field"};
    cheque=""
    splitnum=amount.toString().split("").reverse()
    for (x in splitnum){
        splitnum[x]=parseInt(splitnum[x])
    }
    if (splitnum.length<3){
        while (splitnum.length<3){
            splitnum.push(0)
        }
    } else {
        while (splitnum.length<12){
            splitnum.push(0)
        }
        thousands=splitnum.slice(3,6)
        millions=splitnum.slice(6,9)
        billions=splitnum.slice(9,12)
    }
    hundredsplace=splitnum.slice(0,3)
    isbill=!(arraysequal(billions,[0,0,0]))
    ismill=!(arraysequal(millions,[0,0,0]))
    isthou=!(arraysequal(thousands,[0,0,0]))
    ishund=!(arraysequal(hundredsplace,[0,0,0]))
    if (isbill){
        cheque+=numtowords(billions)+" billion"
        if (!(ismill) && !(isthou) && ishund){
            cheque+=" and "
        } else {cheque+=", "}
    }
    if (ismill){
        cheque+=numtowords(millions)+" million"
        if (!(isthou) && ishund){
            cheque+=" and "
        } else {cheque+=", "}
    }
    if (isthou){
        cheque+=numtowords(thousands)+" thousand"
        if (hundredsplace[2]=="0"){
            cheque+=" and "
        } else {cheque+=", "}
    }
    cheque+=numtowords(hundredsplace)
    for (x in splitnum){
        splitnum[x]=parseInt(splitnum[x])
    }
    cheque=cheque.charAt(0).toUpperCase() + cheque.slice(1)
    document.getElementById("recipientb").innerHTML="Pay "+recipient
    document.getElementById("amount").innerHTML=cheque+" dollars only"
    document.getElementById("senderb").innerHTML="Signed "+sender
}