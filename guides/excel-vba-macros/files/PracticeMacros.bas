Attribute VB_Name = "PracticeMacros"
Option Explicit

' Practice module for Automating Excel with Macros & VBA.
' Import it in the VBA editor with File > Import File (Ctrl+M).

' Lesson 3: format the header row of the active sheet.
Sub FormatHeader()
    With ActiveSheet.Range("A1:E1")
        .Font.Bold = True
        .Interior.Color = RGB(230, 230, 230)
    End With
    ActiveSheet.Columns("A:E").AutoFit
End Sub

' Lesson 4: highlight every order of 500 or more.
Sub HighlightLargeOrders()
    Dim lastRow As Long, r As Long
    lastRow = Cells(Rows.Count, "A").End(xlUp).Row
    For r = 2 To lastRow
        If Cells(r, "D").Value >= 500 Then
            Cells(r, "D").Interior.Color = RGB(255, 235, 150)
        End If
    Next r
End Sub

' Lesson 5: report how many orders are open.
Sub CountOpenOrders()
    Dim n As Long
    n = Application.WorksheetFunction.CountIf(Range("E:E"), "Open")
    MsgBox n & " orders are open.", vbInformation, "Open orders"
End Sub

' Lesson 6: a worksheet function you can use in any cell, e.g. =WITHTAX(D2, 8%)
Function WITHTAX(amount As Double, rate As Double) As Double
    WITHTAX = Round(amount * (1 + rate), 2)
End Function
